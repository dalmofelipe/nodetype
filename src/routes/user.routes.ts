import { Router } from 'express';
import { checkSchema } from 'express-validator';
import UserController from '../controllers/user.controller';
import { 
    userCreateValidationSchema,
    userUpdateValidationSchema
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


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retorna o usuário do ID
 *     tags:
 *     - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero do ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna o usuário se encontrado
 */
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


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza dados do Usuário
 *     tags:
 *     - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero do ID do usuário
 *         schema:
 *           type: integer
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
 *         description: Retorna o usuário se encontrado
 */
router.put('/users/:id', 
    checkSchema(userUpdateValidationSchema, ['body']), 
    UserController.update)



/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Exclui Usuário pelo ID
 *     tags:
 *     - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numero do ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna quantidade de registro excluído
 */
router.delete('/users/:id', UserController.delete)


export default router;
