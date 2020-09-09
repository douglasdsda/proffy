import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateProfile from '../services/Users/UpdateProfile';

export default class ClassesController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            name,
            email,
            sobrenome,
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
        } = req.body;

        const user_id = req.user.id;

        const profile = container.resolve(UpdateProfile);

        const user = await profile.execute({
            name,
            email,
            sobrenome,
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
            user_id,
        });

        return res.json(user);
    }
}
