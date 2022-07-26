import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.findOne({
      where: {
        token,
      },
    });
  }

  public async generate(user_id: string): Promise<UserToken> {
    return this.save(
      this.create({
        user_id,
      }),
    );
  }
}
