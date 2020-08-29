import User from "../entities/User";

export default interface IUsersRepository {
  findById(id: number): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  save(user: User): Promise<User>;
}
