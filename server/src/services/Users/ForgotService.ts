import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import sendMail from '../ProviderEmail';
import AppError from '../../errors/AppErros';
import IUsersRepository from '../../interfaces/IUsersRepository';
import IUsersTokensRepository from '../../interfaces/IUsersTokensRepository';

interface IRequest {
    email: string;
}
@injectable()
class ForgotService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
      
        const findUser = await this.usersRepository.findByEmail(email);

        if (!findUser) {
            throw new AppError('Email addres invalid');
        }
        const hashedEmail = await hash(email, 8);

        const findUsersTokens = await this.usersTokensRepository.findByUserId(
            findUser.id,
        );

     
        if (findUsersTokens && findUsersTokens.id) {
    

            await this.usersTokensRepository.update({
                user_id: findUser.id,
                token: hashedEmail,
            });
        } else {
       

            await this.usersTokensRepository.save({
                token: hashedEmail,
                user_id: findUser.id,
            });
        }

        await sendMail(email, hashedEmail).catch(err => {
            console.log('error: ', err);
            throw new AppError('Send email error.');
        });
    }
}

export default ForgotService;
