import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import UserToken from '../entities/UserToken';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUsersTokensRepository {
    findById(id: number): Promise<UserToken | undefined>;

    findByUserId(user_id: number): Promise<UserToken | undefined>;

    findByToken(token: string): Promise<UserToken | undefined>;

    save(userToken: ICreateUserTokenDTO): Promise<string>;

    update(updateUserDTO: IUpdateUserDTO): Promise<void>;

    deleteByUserId(user_id: number): Promise<void>;
}
