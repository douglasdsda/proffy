import express from 'express';

import UsersController from './controllers/UsersController';
import ensureAuthenticated from './modules/users/infra/http/middlewares/ensureAuthenticated';
import SessionsController from './controllers/SessionsController';

const routes = express.Router();
const usersController = new UsersController();
const sessionController = new SessionsController();
// const classesController = new ClassesController();
// const connectionsController = new ConnectionsController();

// routes.post('/classes', classesController.create);
// routes.get('/classes', classesController.index);

routes.post('/users', usersController.create);
routes.get('/users', ensureAuthenticated, usersController.index);

routes.post('/sessions', sessionController.create);

// routes.post('/connections', connectionsController.create);
// routes.get('/connections', connectionsController.index);

export default routes;
