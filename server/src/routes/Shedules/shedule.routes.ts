import { Router } from 'express';
import ShedulesController from '../../controllers/ShedulesController';
import ensureAuthenticated from '../../middlewares';

const sheduleRouter = Router();
const shedulesController = new ShedulesController();

sheduleRouter.delete('/:id', ensureAuthenticated, shedulesController.delete);
sheduleRouter.get('/', ensureAuthenticated, shedulesController.index);

export default sheduleRouter;
