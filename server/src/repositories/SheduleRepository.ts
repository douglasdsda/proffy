import Shedule, { ScheduleItem } from '../entities/Shedule';

import ISheduleRepository from '../interfaces/IShedulesRepository';
import db from '../database/connection';

class SheduleRepository implements ISheduleRepository {
    public async findById(id: number): Promise<Shedule | undefined> {
        const sheduleDB = await db('class_schedule')
            .select('*')
            .where('id', '=', id)
            .first();

        const shedule = new Shedule();
        Object.assign(shedule, {
            ...sheduleDB,
        });

        return shedule || undefined;
    }

    public async findByClassId(
        class_id: number,
    ): Promise<Shedule[] | undefined> {
        const shedules = await db('class_schedule')
            .select('*')
            .where('class_id', '=', class_id);

        shedules.map(item => {
            const shedule = new Shedule();
            Object.assign(shedule, {
                ...item,
            });

            return shedule;
        });

        return shedules || undefined;
    }

    public async save(data: ScheduleItem[]): Promise<Shedule[]> {
        const shedules = data.map(item => {
            const shedule = new Shedule();
            Object.assign(shedule, { ...item });
            return shedule;
        });

        await db('class_schedule').insert(shedules);

        return shedules || undefined;
    }

    public async update(data: ScheduleItem[]): Promise<Shedule[]> {
        const class_id = data[0].class_id;
        const shedules = data.map(item => {
            const shedule = new Shedule();
            Object.assign(shedule, { ...item });
            return shedule;
        });

        await db('class_schedule')
            .update({ shedules })
            .where('class_id', '=', class_id);

        return shedules || undefined;
    }
}

export default SheduleRepository;
