import { Router } from 'express';

import usersRoute from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRouter);

export default routes;
