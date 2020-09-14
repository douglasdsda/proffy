import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '../services/Users/ResetPasswordService';

export default class ResetPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { password } = req.body;
        const { token } = req.params;

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({
            password,
            token,
        });

        return res.status(201).send();
    }
}
