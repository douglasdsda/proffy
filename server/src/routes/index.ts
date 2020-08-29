import { Router } from 'express';
 

 
// import ClassesController from './controllers/ClassesController';
// import ConnectionsController from './controllers/ConnectionsController';
// import ForgotController from './controllers/ForgotController';
// import ResetPasswordController from './controllers/ResetPasswordController';
// import SessionsController from './controllers/SessionsController';
// import UsersController from './controllers/UsersController';

// import ensureAuthenticated from './middlewares';
import usersRouter from '../routes/users/users.routes';
import sessionsRouter from '../routes/users/sessions.routes';

const routes = Router()
// const usersController = new UsersController();

 routes.use('/users', usersRouter);
 routes.use('/sessions', sessionsRouter);
 

// routes.post('/sessions', SessionsController.create);
// routes.post('/forgot', ForgotController.create)
// routes.post('/resetpassword', ResetPasswordController.create)

// routes.post('/classes', ensureAuthenticated, ClassesController.create)
// routes.get('/classes',ensureAuthenticated , ClassesController.index)
 
// routes.get('/connections', ensureAuthenticated, ConnectionsController.index)
// routes.post('/connections', ensureAuthenticated, ConnectionsController.create)

export default routes