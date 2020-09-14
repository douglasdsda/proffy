import { injectable, inject } from 'tsyringe';
import IShedulesRepository from '../../interfaces/IShedulesRepository';

import AppError from '../../errors/AppErros';

interface IRequest {
    id: number;
}
@injectable()
class DeleteShedulesService {
    constructor(
        @inject('SheduleRepository')
        private shedulesRepository: IShedulesRepository,
    ) {}

    public async execute({ id }: IRequest): Promise<any> {
        const shedule = await this.shedulesRepository.findById(id);

        if (shedule && shedule.id) {
            this.shedulesRepository.delete(id);
        } else {
            throw new AppError('Shedule item not exists');
        }
    }
}

export default DeleteShedulesService;
