import { Router } from 'express';
import ensureAuthenticated from '../../middlewares';

import ClassesController from '../../controllers/ClassesController';

const classesRouter = Router();
const classesController = new ClassesController();

classesRouter.post('/', ensureAuthenticated, classesController.create);
classesRouter.get('/', ensureAuthenticated, classesController.index);
classesRouter.put('/', ensureAuthenticated, classesController.update);

export default classesRouter;
