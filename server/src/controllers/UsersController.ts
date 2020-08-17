import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import UserRepository from "../Repositories/UsersRepository";

const userRepository = new UserRepository();

export default class UsersController {
  public async index(request: Request, response: Response) {
    const users = await userRepository.index();

    return response.json(users);
  }

  public async create(request: Request, response: Response) {
    const { name, sobrenome, email, password } = request.body;

    const createUserService = new CreateUserService(userRepository);

    const user = createUserService.execute({
      name,
      sobrenome,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}
