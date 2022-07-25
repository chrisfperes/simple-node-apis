import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionCreator = new CreateSessionService();

    return response.json(await sessionCreator.execute({ email, password }));
  }
}
