import { Router } from 'express';
import ForgotController from '../../controllers/ForgotController';

const forgotRouter = Router();
const forgotController = new ForgotController();

forgotRouter.post('/', forgotController.create);

export default forgotRouter;
