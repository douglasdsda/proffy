import ICreateClasses from '../dtos/ICreateClasses';
import Classes from '../entities/Classes';

import IClassesFindPagination from '../dtos/IClassesFindPagination';

export default interface IClassesRepository {
    findById(id: number): Promise<Classes | undefined>;

    findPagination(data: IClassesFindPagination): Promise<void>;

    findByUserId(user_id: number): Promise<Classes | undefined>;

    save(data: ICreateClasses): Promise<Classes>;

    update(data: ICreateClasses): Promise<Classes>;
}
