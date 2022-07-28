import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const userExists = await customerRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already in use.');
    }

    const user = customerRepository.create({
      name,
      email,
    });

    return customerRepository.save(user);
  }
}

export default CreateCustomerService;
