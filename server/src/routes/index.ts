import { Router } from 'express';

import usersRouter from './users/users.routes';
import sessionsRouter from './users/sessions.routes';
import forgotRouter from './users/forgot.routes';
import connectionsRouter from './users/connections.routes';
import classesRouter from './users/classes.routes';
import resetPasswordRouter from './users/resetPassword.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/forgot', forgotRouter);
routes.use('/reset', resetPasswordRouter);
routes.use('/connections', connectionsRouter);
routes.use('/classes', classesRouter);

export default routes;
