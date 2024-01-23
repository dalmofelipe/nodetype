import { Op } from "sequelize";
import { User } from "../models/user.model";

class UserService {

    async findAll(name:string, email:string) {
        return await User.findAll({
            attributes: { exclude: ['password'] },
            order: [ ['id','ASC'] ],
            where: {
                [Op.and]: {
                    name: {
                        [Op.like]: `%${name || '' }%`
                    },
                    email: {
                        [Op.like]: `%${email || '' }%`
                    }
                },
            }
        });
    }

    async findOne(id:string) {
        return await User.findOne({ 
            attributes: { exclude: ['password'] },
            where: { id } 
        })
    }
}

export default new UserService();