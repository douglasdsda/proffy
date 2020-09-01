import { Router } from 'express';

import ResetPasswordController from '../../controllers/ResetPasswordController';

const resetPasswordRouter = Router();
const resetPasswordController = new ResetPasswordController();

resetPasswordRouter.post('/', resetPasswordController.create);

export default resetPasswordRouter;
