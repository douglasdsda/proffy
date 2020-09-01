import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import db from '../database/connection';

export default class ResetPasswordController {
    public async create(req: Request, res: Response) {
        const { token, new_password } = req.body;
        try {
            const userToken = await db('users_tokens')
                .select('*')
                .where('token', '=', token)
                .first();

            if (userToken) {
                const tokenCreated = userToken.created_at;

                const compareDate = addHours(tokenCreated, 2);

                if (isAfter(Date.now(), compareDate)) {
                    return res.status(401).json({ error: 'token ixpired.' });
                }

                const { user_id } = userToken;

                const passwordhash = await hash(new_password, 8);

                await db('users').where('id', '=', user_id).update({
                    password: passwordhash,
                });

                await db('users_tokens')
                    .delete('*')
                    .where('user_id', '=', user_id);

                return res.status(200).json({ status: 'OK' });
            }
            return res.status(400).json({
                error: 'token is invalid, token used.',
            });
        } catch (err) {
            return res.status(400).json({
                error: 'Internal server error.',
            });
        }
    }
}
