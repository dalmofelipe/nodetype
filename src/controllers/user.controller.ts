import { Request, Response } from 'express';
import { User } from '../models/user.model';

class UserController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const userDb = await User.findOne({
                where: {
                    email
                }
            })
            if (userDb != null) {
                res.status(422).json({ msg: 'Email Already In Use' });
                return
            }

            const user = await User.create({ name, email, password });
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();
