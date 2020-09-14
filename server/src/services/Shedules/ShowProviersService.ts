import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppErros';
import convertHourToMinutes from '../../utils/convertHourToMinutes';
import IShedulesRepository from '../../interfaces/IShedulesRepository';
import ICLassesRepository from '../../interfaces/IClassesRepository';

import IUsersRepository from '../../interfaces/IUsersRepository';

interface IRequest {
    subject: string;
    week_day: string;
    time: string;
}
@injectable()
class ShowProviersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('classesRepository')
        private classesRepository: ICLassesRepository,
        @inject('SheduleRepository')
        private shedulesRepository: IShedulesRepository,
    ) {}

    public async execute({ week_day, subject, time }: IRequest): Promise<any> {
        const timeMinutos = convertHourToMinutes(time);

        if (!week_day || !subject || !time) {
            throw new AppError('filter invalid.');
        }

        const list = this.shedulesRepository.findByFilter({
            subject,

            timeMinutos,
            week_day,
        });

        return list;
    }
}

export default ShowProviersService;
