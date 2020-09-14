import IUserUpdateAvatarDTO from '../dtos/IUserUpdateAvatarDTO';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import User from '../entities/User';

export default interface IUsersRepository {
    findById(id: number): Promise<User | undefined>;

    findByEmail(email: string): Promise<User | undefined>;

    save(user: ICreateUsersDTO): Promise<User>;
    update(user: ICreateUsersDTO): Promise<void>;
    updateAvatar(user: IUserUpdateAvatarDTO): Promise<void>;
}
