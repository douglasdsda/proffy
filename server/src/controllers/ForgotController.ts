import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ForgotService from '../services/Users/ForgotService';

export default class ForgotController {
    public async create(req: Request, res: Response) {
        const { email } = req.body;

        const forgot = container.resolve(ForgotService);

        await forgot.execute({
            email,
        });

        return res.status(201).send();
    }
}
