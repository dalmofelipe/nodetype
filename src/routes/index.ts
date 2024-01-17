import { Router } from 'express';
import { checkSchema } from 'express-validator';
import UserController from '../controllers/user.controller';
import { userCreateValidationSchema } from '../validations/user.validations';

const router = Router();

router.get('/users', UserController.getAll);
router.post('/users', checkSchema(userCreateValidationSchema), UserController.create);

export default router;
