import { injectable, inject } from 'tsyringe';
import IShedulesRepository from '../../interfaces/IShedulesRepository';
import ICLassesRepository from '../../interfaces/IClassesRepository';
import AppError from '../../errors/AppErros';
import IUsersRepository from '../../interfaces/IUsersRepository';

import { ScheduleItem } from '../../entities/Shedule';

interface IRequest {
    user_id: number;
}
@injectable()
class ProfileShow {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('classesRepository')
        private classesRepository: ICLassesRepository,
        @inject('SheduleRepository')
        private shedulesRepository: IShedulesRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<any> {
        const user = await this.usersRepository.findById(user_id);
        let schedule: ScheduleItem[] = [];
        if (!user) {
            throw new AppError('User not exists');
        }

        const classes = await this.classesRepository.findByUserId(user_id);

        if (classes && classes.id) {
            schedule =
                (await this.shedulesRepository.findByClassId(classes.id)) || [];
        }

        return { user, classes, schedule };
    }
}

export default ProfileShow;
