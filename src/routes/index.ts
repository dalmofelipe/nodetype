import { Router } from 'express';
import { checkSchema } from 'express-validator';
import UserController from '../controllers/user.controller';
import { 
    userCreateValidationSchema 
} from '../validations/user.validations';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     tags:
 *     - users
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Texto para filtrar usuários por nome
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Texto para filtrar usuários por e-mail
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/users', UserController.getAll);


router.get('/users/:id', UserController.getByID);


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Resgistra um novo usuário
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retorna o usuário criado
 *       422:
 *         description: Requisição inválida
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                        type: 
 *                          type: string
 *                        value: 
 *                          type: string
 *                        msg: 
 *                          type: string
 *                        path: 
 *                          type: string
 *                        location: 
 *                          type: string
 */
router.post('/users', 
    checkSchema(userCreateValidationSchema, ['body']),
    UserController.create);

export default router;
