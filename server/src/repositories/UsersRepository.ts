import User from '../entities/User';

import IUsersRepository from '../interfaces/IUsersRepository';
import db from '../database/connection';

class UsersRepository implements IUsersRepository {
    constructor() {}

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
}

export default UsersRepository;
