import ICLassesRepository from '../interfaces/IClassesRepository';
import IClassesFindPagination from '../dtos/IClassesFindPagination';
import ICreateClasses from '../dtos/ICreateClasses';

import convertHourToMinutes from '../utils/convertHourToMinutes';
import Classes from '../entities/Classes';

import db from '../database/connection';

class ClassesRepository implements ICLassesRepository {
    public async findById(id: number): Promise<Classes | undefined> {
        const classesDB = await db('classes')
            .select('*')
            .where('id', '=', id)
            .first();

        const classes = new Classes();
        Object.assign(classes, {
            ...classesDB,
        });

        return classes || undefined;
    }

    public async findPagination({
        from,
        subject,
        to,
        week_day,
    }: IClassesFindPagination): Promise<any> {
        const timeFrom = convertHourToMinutes(String(from));
        const timeTo = convertHourToMinutes(String(to));

        const search = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .where('week_day', 'like', week_day || ('%' as any))
                    .where(
                        'from',
                        '>=',
                        from ? (from !== 'null' ? timeFrom : 0) : 0,
                    )
                    .where(
                        'to',
                        '<=',
                        to ? (to !== 'null' ? timeTo : 1440) : 1440,
                    );
            })
            .join('users', 'users.id', '=', 'user_id')
            .select('*')
            .where('subject', 'like', subject || ('%' as any));

        return search;
    }

    public async findByUserId(id: number): Promise<Classes | undefined> {
        const classesDB = await db('classes')
            .select('*')
            .where('user_id', '=', id)
            .first();

        const classes = new Classes();
        Object.assign(classes, {
            ...classesDB,
        });

        return classes || undefined;
    }

    public async save(data: ICreateClasses): Promise<Classes> {
        const id = await db('classes').insert(data);

        const classes = new Classes();

        Object.assign(classes, { ...data, id: id[0] });

        return { ...classes } || undefined;
    }

    public async update({
        cost,
        subject,
        user_id,
        id,
    }: ICreateClasses): Promise<Classes> {
        await db('classes')
            .update({
                id,
                subject,
                cost,
                user_id,
            })
            .where('user_id', '=', user_id);

        const classes = new Classes();
        Object.assign(classes, { cost, subject, user_id, id });

        return classes;
    }
}

export default ClassesRepository;
