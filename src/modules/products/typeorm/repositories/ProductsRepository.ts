import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({
      where: {
        name,
      },
    });
  }

  public async findAllByIds(ids: string[]): Promise<Product[]> {
    return this.find({
      where: {
        id: In(ids),
      },
    });
  }
}
