import Shedule, { ScheduleItem } from '../entities/Shedule';

export default interface IShedulesRepository {
    findById(id: number): Promise<Shedule | undefined>;

    findByClassId(class_id: number): Promise<Shedule[] | undefined>;

    save(data: ScheduleItem[]): Promise<Shedule[]>;

    update(data: ScheduleItem[]): Promise<Shedule[]>;
}
