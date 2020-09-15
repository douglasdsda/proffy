import FilterSheduleDTO from 'dtos/FilterSheduleDTO';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import Shedule, { ScheduleItem } from '../entities/Shedule';

import ISheduleRepository from '../interfaces/IShedulesRepository';
import db from '../database/connection';

class SheduleRepository implements ISheduleRepository {
    public async findByFilter({
        week_day,
        timeMinutos,
        subject,
    }: FilterSheduleDTO): Promise<any> {
        const list = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [
                        Number(week_day),
                    ])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeMinutos])
                    .whereRaw('`class_schedule`.`to` > ??', [timeMinutos]);
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return list;
    }

    public async deleteByClassIdAll(class_id: number): Promise<void> {
        await db('class_schedule').delete('*').where('class_id', '=', class_id);
    }

    public async delete(id: number): Promise<void> {
        await db('class_schedule').delete('*').where('id', '=', id);
    }

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

    public async save(
        data: ScheduleItem[],
        class_id: number,
    ): Promise<Shedule[]> {
        const shedules = data.map(item => {
            const shedule = new Shedule();
            Object.assign(shedule, {
                ...item,
                from: convertHourToMinutes(item.from),
                to: convertHourToMinutes(item.to),
                class_id,
            });
            return { ...shedule };
        });

        await db('class_schedule').insert(shedules);

        return shedules || undefined;
    }

    public async update(data: ScheduleItem[]): Promise<any[]> {
        const class_id = data[0].class_id;
        const shedules = data.map(async item => {
            const shedule = new Shedule();
            Object.assign(shedule, {
                ...item,
                from: convertHourToMinutes(item.from),
                to: convertHourToMinutes(item.to),
                class_id,
            });

            await db('class_schedule')
                .update({ ...shedule })
                .where('id', '=', shedule.id);

            return { ...shedule };
        });

        return shedules || undefined;
    }
}

export default SheduleRepository;
