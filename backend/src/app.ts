import 'reflect-metadata';
import express from 'express';
import authRouter from './routes/authRoutes'
import userRouter from './routes/userRoutes';
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

app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use('/login', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.render('index');
})

startServer();