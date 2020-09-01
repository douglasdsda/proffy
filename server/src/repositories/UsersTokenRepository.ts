import IUsersTokensRepository from 'interfaces/IUsersTokensRepository';
import UserToken from '../entities/UserToken';

import db from '../database/connection';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';

class UsersTokensRepository implements IUsersTokensRepository {
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userTokenDB = await db('users_tokens')
            .select('*')
            .where('token', '=', token)
            .first();

        const userToken = new UserToken();
        Object.assign(userToken, {
            ...userTokenDB,
        });

        return userToken || undefined;
    }

    public async deleteByUserId(user_id: number): Promise<void> {
        await db('users_tokens').delete('*').where('user_id', '=', user_id);
    }

    public async findById(id: number): Promise<UserToken | undefined> {
        const userTokenDB = await db('users_tokens')
            .select('*')
            .where('id', '=', id)
            .first();

        const userToken = new UserToken();
        Object.assign(userToken, {
            ...userTokenDB,
        });

        return userToken || undefined;
    }

    public async findByUserId(user_id: number): Promise<UserToken | undefined> {
        const userTokenDB = await db('users_tokens')
            .select('*')
            .where('user_id', '=', user_id)
            .first();

        const userToken = new UserToken();
        Object.assign(userToken, {
            ...userTokenDB,
        });

        return userToken || undefined;
    }

    public async save(userToken: ICreateUserTokenDTO): Promise<string> {
        await db('users_tokens').insert(userToken);

        return userToken.hash;
    }

    public async update(updateUserDTO: IUpdateUserDTO): Promise<void> {
        if (updateUserDTO && updateUserDTO.user_id) {
            await db('users_tokens')
                .update({ token: updateUserDTO.hash })
                .where('user_id', '=', updateUserDTO.user_id);
        }
    }
}

export default UsersTokensRepository;
