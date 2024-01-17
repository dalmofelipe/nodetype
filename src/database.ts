import dotenv from 'dotenv';
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "./models/user.model";

dotenv.config();

enum Dialect {
    MySQL = 'mysql',
    PostgreSQL = 'postgres',
    SQLite = 'sqlite',
    MSSQL = 'mssql',
}

let dbconf : SequelizeOptions = {}

const {
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DIALECT
} = process.env

if(DB_DIALECT && DB_DIALECT != Dialect.SQLite && DB_USERNAME && DB_PASSWORD) {
    dbconf = { 
        database: DB_DATABASE,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        dialect: DB_DIALECT as Dialect
    }    
} else {
    dbconf = {
        dialect: Dialect.SQLite,
        storage: './database.sqlite',
    }
}

export default new Sequelize({
    ...dbconf,
    models: [User]
});
