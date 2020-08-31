import { Request, Response } from 'express';

import { container } from 'tsyringe';
import AuthenticateUserService from '../services/Users/AuthenticateUserService';

export default class SessionsController {
    public async create(req: Request, res: Response) {
        const { email, password } = req.body;

        const auth = container.resolve(AuthenticateUserService);

        const user = await auth.execute({
            email,
            password,
        });

        return res.json(user);
    }
}
