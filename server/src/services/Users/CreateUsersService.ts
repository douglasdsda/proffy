import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppErros';
import IUsersRepository from '../../interfaces/IUsersRepository';
import User from '../../entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
    sobrenome: string;
}
@injectable()
class CreateUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
        sobrenome,
    }: IRequest): Promise<User> {
        const checkUsersExists = await this.usersRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError('Email addres alredy used');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.save({
            name,
            email,
            password: hashedPassword,
            sobrenome,
        });

        // console.log("user: ", JSON.stringify(user));
        return user;
    }
}

export default CreateUsersService;
