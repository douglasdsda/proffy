import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UserController from './controllers/UsersController';
import UsersController from './controllers/UsersController';
 
const routes = express.Router();
const usersController = new UsersController();
// const classesController = new ClassesController();
// const connectionsController = new ConnectionsController();

// routes.post('/classes', classesController.create);
// routes.get('/classes', classesController.index);

routes.post('/users', usersController.create);
routes.get('/users', usersController.index);

// routes.post('/connections', connectionsController.create);
// routes.get('/connections', connectionsController.index);
 

export default routes;