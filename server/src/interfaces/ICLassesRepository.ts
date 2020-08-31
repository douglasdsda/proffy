import ICreateClasses from '../dtos/ICreateClasses';
import Classes from '../entities/Classes';

export default interface IUsersRepository {
    findById(id: number): Promise<Classes | undefined>;

    findByUserId(user_id: number): Promise<Classes | undefined>;

    save(data: ICreateClasses): Promise<Classes>;

    update(data: ICreateClasses): Promise<Classes>;
}
