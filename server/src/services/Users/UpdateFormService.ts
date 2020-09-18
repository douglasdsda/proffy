import { injectable, inject } from 'tsyringe';
import IShedulesRepository from '../../interfaces/IShedulesRepository';
import ICLassesRepository from '../../interfaces/IClassesRepository';
import AppError from '../../errors/AppErros';
import IUsersRepository from '../../interfaces/IUsersRepository';

import { ScheduleItem } from '../../entities/Shedule';

interface IRequest {
    whatsapp: string;
    subject: string;
    cost: number;
    bio: string;
    user_id: number;
    schedule: ScheduleItem[];
}
@injectable()
class UpdateFormService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('classesRepository')
        private classesRepository: ICLassesRepository,
        @inject('SheduleRepository')
        private shedulesRepository: IShedulesRepository,
    ) {}

    public async execute({
        whatsapp,
        bio,
        subject,
        cost,
        schedule,
        user_id,
    }: IRequest): Promise<any> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not exists');
        }

        user.whatsapp = whatsapp;
        user.bio = bio;
        if (user.id) {
            await this.usersRepository.update(user);
        } else {
            await this.usersRepository.save(user);
        }

        let classes = await this.classesRepository.findByUserId(user_id);

        if (classes && classes.id) {
            classes = await this.classesRepository.update({
                id: classes.id,
                cost,
                subject,
                user_id,
            });
        } else {
            classes = await this.classesRepository.save({
                cost,
                subject,
                user_id,
            });
        }

        if (classes && classes.id) {
            const listUpdate = schedule.filter(item => item.id !== undefined);
            const listInsert = schedule.filter(item => item.id === undefined);

            if (listUpdate.length > 0)
                this.shedulesRepository.update(listUpdate);
            if (listInsert.length > 0)
                this.shedulesRepository.save(listInsert, classes.id);
        }

        return { user, classes, schedule };
    }
}

export default UpdateFormService;
