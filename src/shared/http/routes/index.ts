import productsRouter from '@modules/products/routes/productsRouter';
import passwordRouter from '@modules/users/routes/passwordRouter';
import sessionRouter from '@modules/users/routes/sessionRouter';
import usersRouter from '@modules/users/routes/usersRouter';

import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);

export default routes;
