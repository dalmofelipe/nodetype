import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model';
import UserService from '../services/user.service';

class UserController {

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { name, email } = req.query

            const users = await UserService.findAll(name as string, email as string)

            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getByID(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            res.json(await UserService.findOne(id as string));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return
        }

        try {
            const { name, email, password } = req.body;
            const userDb = await User.findOne({ where: { email } })
            if (userDb != null) {
                res.status(422).json({ msg: 'Email Already In Use' });
                return
            }

            const user = await User.create({ name, email, password });
            res.json({ ...user.dataValues, password:'Ofusqued' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(422).json({ errors: result.array() });
            return
        }
        
        try {
            const { id } = req.params
            const userDb = await User.findByPk(id)
            if(!userDb) {
                res.status(404).json({ msg: `User ID "${id}" Not Found` });
                return;
            }

            const { name, email, password } = req.body
            userDb.name = name || userDb.name
            userDb.email = email || userDb.email
            if(password) {
                userDb.password = password
            }
            await userDb.save()
            res.status(200).json({ ...userDb.dataValues, password: 'Ofusqued' })
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
