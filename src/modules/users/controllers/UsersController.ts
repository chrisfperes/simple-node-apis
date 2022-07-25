import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    console.log(request.user.id);

    const listUser = new ListUsersService();

    return response.json(await listUser.execute());
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    return response.json(await createUser.execute({ name, email, password }));
  }
}
