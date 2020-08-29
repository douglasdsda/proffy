import { Request, Response, response } from "express";

import CreateUsersService from "../services/Users/CreateUsersService";
import { container } from "tsyringe";

export default class UsersController {
  public async create(req: Request, res: Response) {
    const { name, sobrenome, email, password } = req.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
      name,
      sobrenome,
      email,
      password,
    });

    return res.json(user);
  }
}
