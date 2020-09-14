import FilterSheduleDTO from '../dtos/FilterSheduleDTO';
import Shedule, { ScheduleItem } from '../entities/Shedule';

export default interface IShedulesRepository {
    findById(id: number): Promise<Shedule | undefined>;

    findByClassId(class_id: number): Promise<Shedule[] | undefined>;

    save(data: ScheduleItem[], class_id: number): Promise<any[]>;

    update(data: ScheduleItem[]): Promise<Shedule[]>;

    deleteByClassIdAll(class_id: number): Promise<void>;

    findByFilter(data: FilterSheduleDTO): Promise<any>;

    delete(id: number): Promise<void>;
}
