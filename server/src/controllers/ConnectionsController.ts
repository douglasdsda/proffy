import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
    public async index(req: Request, res: Response) {
        const connections = await db('connections').select('*');
        return res.status(200).json({ total: connections.length, connections });
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.body;

        await db('connections').insert({ user_id });
        return res.status(201).send();
    }
}
