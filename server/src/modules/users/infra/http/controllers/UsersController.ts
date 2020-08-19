import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUsersService from '../../../services/CreateUsersService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, sobrenome, email, password } = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
      name,
      email,
      password,
      sobrenome,
    });

    return response.json(user);
  }
}
