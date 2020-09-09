import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUsersService from '../services/Users/CreateUsersService';

export default class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, sobrenome, email, password } = req.body;

        const createUser = container.resolve(CreateUsersService);

        const user = await createUser.execute({
            name,
            sobrenome,
            email,
            password,
        });

        return res.json(user);
    }
}
