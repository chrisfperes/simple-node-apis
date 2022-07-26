import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerUpdateEmail = await customerRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail?.id !== id) {
      throw new AppError('Email already in use.');
    }

    customer.name = name;
    customer.email = email;

    return customerRepository.save(customer);
  }
}

export default UpdateCustomerService;
