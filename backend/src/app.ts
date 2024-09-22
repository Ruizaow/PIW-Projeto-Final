import 'reflect-metadata';
import express from 'express';
import authRouter from './routes/authRoutes'
import userRouter from './routes/userRoutes';
import roleRouter from './routes/roleRoutes';
import movieRouter from './routes/movieRoutes';
import cors from "cors";
import { AppDataSource } from './data-source';
import { engine } from 'express-handlebars';
import path from 'path';

async function startServer() {
    try {
        await AppDataSource.initialize();

        app.listen(PORT, () => {
            console.log(`Servidor escutando requisições em http://localhost:${PORT}`);
        })
    } catch(error) {
        throw error;
    }
}

const app = express();
const PORT = 8000;

app.use(cors())

app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use('/login', authRouter);
app.use('/users', userRouter);
app.use('/roles', roleRouter)
app.use('/films', movieRouter);

app.get('/', (req, res) => {
    res.render('index');
});

startServer();