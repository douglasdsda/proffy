import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import AppError from '../../errors/AppErros';
import IUsersRepository from '../../interfaces/IUsersRepository';
import User from '../../entities/User';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';
import authConfig from '../../config/auth';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email not exists.', 401);
        }

        const passwordVerited = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordVerited) {
            throw new AppError('Invalid password or email', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        if (user.avatar)
            user.avatar_url = `${process.env.APP_API_URL}/files/${user.avatar}`;

        const token = sign({}, secret, {
            subject: user?.id?.toString(),
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
