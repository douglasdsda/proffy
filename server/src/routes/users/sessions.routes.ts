import { Router } from 'express';
import UsersController from '../../controllers/UsersController';
import SessionsController from '../../controllers/SessionsController';
 

const sessionsRouter = Router();
const sessionsController = new SessionsController();
 
 
sessionsRouter.post(
    '/',
   
    sessionsController.create,
);
 
export default sessionsRouter;
