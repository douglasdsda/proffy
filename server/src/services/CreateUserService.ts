import AppError from '../erros/AppError';

 
import User from "../entities/User";
import UserRepository from "../Repositories/UsersRepository";

interface Request {
  name: string;
  sobrenome: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    name,
    sobrenome,
    email,
    password,
  }: Request): Promise<User> {
    try {
      const user = await this.userRepository.create({
        name,
        sobrenome,
        email,
        password,
      });
      return user;
    } catch (error) {
      throw new AppError("Error in Create User", 400);
    }
  }
}

export default CreateUserService;
