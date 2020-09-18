import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '../../errors/AppErros';
import IUsersRepository from '../../interfaces/IUsersRepository';

import IUsersTokensRepository from '../../interfaces/IUsersTokensRepository';

interface IRequest {
    password: string;
    token: string;
}
@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
    ) {}

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByToken(token);
       

        if (!userToken) {
            throw new AppError('User  token does not exists');
        }
        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreated = userToken.created_at;

        const compareDate = addHours(new Date(tokenCreated), 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        const hashedPassword = await hash(password, 8);
 
        user.password = hashedPassword;
        await this.usersRepository.update({
            ...user,
        });

        await this.usersTokensRepository.deleteByUserId(user.id);
    }
}

export default ResetPasswordService;
