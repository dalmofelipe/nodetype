import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './routes';
import database from './database';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use('/api', routes);

database.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
