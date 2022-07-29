import customerRouter from '@modules/customers/routes/customerRouter';
import ordersRouter from '@modules/orders/routes/ordersRouter';
import productsRouter from '@modules/products/routes/productsRouter';
import passwordRouter from '@modules/users/routes/passwordRouter';
import profileRouter from '@modules/users/routes/profileRouter';
import sessionRouter from '@modules/users/routes/sessionRouter';
import usersRouter from '@modules/users/routes/usersRouter';

import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', ordersRouter);

export default routes;
