import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProviersService from '../services/Shedules/ShowProviersService';
import DeleteShedulesService from '../services/Shedules/DeleteShedulesService';

export default class ShedulesController {
    public async index(req: Request, res: Response): Promise<Response> {
        const filters = req.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        const sheduleShowService = container.resolve(ShowProviersService);

        const show = await sheduleShowService.execute({
            week_day,
            subject,
            time,
        });

        return res.json(show);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteSheduleService = container.resolve(DeleteShedulesService);

        await deleteSheduleService.execute({
            id: Number(id),
        });

        return res.status(204).send();
    }
}
