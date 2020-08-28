import express from 'express';
import cors from 'cors';

 
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import ForgotController from './controllers/ForgotController';
import ResetPasswordController from './controllers/ResetPasswordController';
import SessionsController from './controllers/SessionsController';
import UsersController from './controllers/UsersController';

import ensureAuthenticated from './middlewares';

const routes = express.Router()

routes.use(express.json())
routes.use(cors())

routes.post('/sessions', SessionsController.create);
routes.post('/users', UsersController.create);
routes.post('/forgot', ForgotController.create)
routes.post('/resetpassword', ResetPasswordController.create)

routes.post('/classes', ensureAuthenticated, ClassesController.create)
routes.get('/classes',ensureAuthenticated , ClassesController.index)
 
routes.get('/connections', ensureAuthenticated, ConnectionsController.index)
routes.post('/connections', ensureAuthenticated, ConnectionsController.create)

export default routes