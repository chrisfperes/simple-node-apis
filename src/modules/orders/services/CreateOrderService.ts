import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { exist } from 'joi';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find customer.');
    }

    const existsProducts = await productsRepository.findAllByIds(
      products.map(product => product.id),
    );

    if (!existsProducts.length || existsProducts.length < products.length) {
      throw new AppError(
        'Could not find some of the products with the given ids.',
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(existProduct => existProduct.id === product.id)[0]
          .quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(
        existingProduct => existingProduct.id === product.id,
      )[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updateProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(
          existingProduct => existingProduct.id === product.product_id,
        )[0].quantity - product.quantity,
    }));

    await productsRepository.save(updateProductQuantity);

    return order;
  }
}

export default CreateOrderService;
