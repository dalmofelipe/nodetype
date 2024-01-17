import express, { Application, Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import routes from './routes';

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', routes);

// Configurar Sequelize
const sequelize = new Sequelize({
    database: 'devdb',
    dialect: 'mysql',
    username: 'myuser',
    password: '123123',
    //storage: ':memory:',
    models: [User],
});

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
