import IUserUpdateAvatarDTO from 'dtos/IUserUpdateAvatarDTO';
import User from '../entities/User';

import IUsersRepository from '../interfaces/IUsersRepository';
import db from '../database/connection';

class UsersRepository implements IUsersRepository {
    public async updateAvatar({
        avatar,
        id,
    }: IUserUpdateAvatarDTO): Promise<void> {
        await db('users')
            .update({
                avatar,
            })
            .where('id', '=', id);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const userDB = await db('users')
            .select('*')
            .where('email', '=', email)
            .first();

        let user;

        if (userDB) {
            user = new User();
            Object.assign(user, {
                ...userDB,
            });
        }

        return user || undefined;
    }

    public async findById(id: number): Promise<User | undefined> {
        const userDB = await db('users')
            .select('*')
            .where('id', '=', id)
            .first();

        const user = new User();
        Object.assign(user, {
            ...userDB,
        });

        return user || undefined;
    }

    public async save(user: User): Promise<User> {
        const userDBId = await db('users').insert(user);

        user.id = userDBId[0];

        return user || undefined;
    }

    public async update({
        email,
        bio,
        whatsapp,
        name,
        sobrenome,
        id,
    }: User): Promise<void> {
        await db('users')
            .update({
                email,
                bio,
                whatsapp,
                name,
                sobrenome,
            })
            .where('id', '=', id);
    }
}

export default UsersRepository;
