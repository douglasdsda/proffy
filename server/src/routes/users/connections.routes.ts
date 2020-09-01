import { Router } from 'express';
import ConnectionsController from '../../controllers/ConnectionsController';
import ensureAuthenticated from '../../middlewares';

const connectionsRouter = Router();
const connectionsController = new ConnectionsController();

connectionsRouter.post('/', ensureAuthenticated, connectionsController.create);
connectionsRouter.get('/', ensureAuthenticated, connectionsController.index);

export default connectionsRouter;
