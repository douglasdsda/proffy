import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateFormService from '../services/Users/UpdateFormService';

import ProfileShow from '../services/Users/ProfileShow';
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
            avatar,
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

    public async update(req: Request, res: Response): Promise<Response> {
        const { whatsapp, bio, subject, cost, schedule } = req.body;

        const user_id = req.user.id;

        const updateFormService = container.resolve(UpdateFormService);

        const user = await updateFormService.execute({
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
            user_id,
        });

        return res.json(user);
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const { id } = req.query;
        const profileShow = container.resolve(ProfileShow);

        const userClassesShedule = await profileShow.execute({
            user_id: Number(id) || user_id,
        });

        return res.json(userClassesShedule);
    }
}
