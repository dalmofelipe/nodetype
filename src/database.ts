import dotenv from 'dotenv';
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user.model";

dotenv.config();

const { DB_STRING_CONN } = process.env

export default new Sequelize(DB_STRING_CONN as string, {
    models: [ User ]
})