import { injectable, inject } from 'tsyringe';
import IShedulesRepository from '../../interfaces/IShedulesRepository';
import ICLassesRepository from '../../interfaces/IClassesRepository';
import AppError from '../../errors/AppErros';
import IUsersRepository from '../../interfaces/IUsersRepository';

import { ScheduleItem } from '../../entities/Shedule';

interface IRequest {
    name: string;
    email: string;

    sobrenome: string;
    whatsapp: string;
    subject: string;
    cost: number;
    bio: string;
    user_id: number;
    schedule: ScheduleItem[];
}
@injectable()
class UpdateProfile {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('classesRepository')
        private classesRepository: ICLassesRepository,
        @inject('ShedulesRepository')
        private shedulesRepository: IShedulesRepository,
    ) {}

    public async execute({
        name,
        email,
        sobrenome,
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

        const checkUsersExists = await this.usersRepository.findByEmail(email);

        if (checkUsersExists && user_id !== checkUsersExists.id) {
            throw new AppError('Email addres alredy used');
        }
        user.name = name;
        user.sobrenome = sobrenome;
        user.email = email;
        user.whatsapp = whatsapp;
        user.bio = bio;

        await this.usersRepository.save(user);

        let classes = await this.classesRepository.findByUserId(user_id);

        if (classes) {
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

        if (classes) {
            const listUpdate = schedule.filter(item => item.id !== undefined);
            const listInsert = schedule.filter(item => item.id === undefined);

            if (listUpdate.length > 0) this.shedulesRepository.save(listInsert);
            if (listInsert.length > 0) this.shedulesRepository.save(listUpdate);
        }

        return { user, classes, schedule };
    }
}

export default UpdateProfile;
