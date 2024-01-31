import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from './user.model';
import UserService from './user.service';

class UserController {

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { name, email } = req.query
            res.json(await UserService.findAll(name as string, email as string));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getByID(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const user = await UserService.findOne(id as string)
            if(!user) {
                res.status(404).json({ error: 'Usuário Não Encontrado' })
                return
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        // validações das informações de entrada
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return
        }

        const { name, email, password } = req.body;
        
        // validação se usuário já esta cadastrado
        const userDb = await User.findOne({ where: { email } })
        if (userDb != null) {
            res.status(422).json({ msg: 'Email Already In Use' });
            return
        }

        try {
            const user = await User.create({ name, email, password });

            res.json({ ...user.dataValues });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        // validações dos dados de entrada
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return
        }

        const { id } = req.params
        const userDb = await User.findByPk(id)
        if(!userDb) {
            res.status(404).json({ msg: `User ID "${id}" Not Found` });
            return;
        }

        const { name, email, password } = req.body
        
        try {    
            userDb.name = name || userDb.name
            userDb.email = email || userDb.email
            if(password) {
                userDb.password = password
            }
            await userDb.save()

            res.status(200).json({ ...userDb.dataValues })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const count = await User.destroy({ where: { id } })
            
            res.status(200).send(`${count}`);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();
