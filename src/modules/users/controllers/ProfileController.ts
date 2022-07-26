import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();

    return response.json(
      await showProfile.execute({ user_id: request.user.id }),
    );
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const updateProfile = new UpdateProfileService();

    return response.json(
      await updateProfile.execute({
        user_id,
        name,
        email,
        password,
        old_password,
      }),
    );
  }
}
