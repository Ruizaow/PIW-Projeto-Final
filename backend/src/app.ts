import 'reflect-metadata';
import express from 'express';
import authRouter from './routes/authRoutes'
import userRouter from './routes/userRoutes';
import { AppDataSource } from './data-source';
import { engine } from 'express-handlebars';
import path from 'path';

const app = express();
app.use(express.json());

app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index');
})

app.use('', authRouter)
app.use('/users', userRouter)

async function main() {
    await AppDataSource.initialize();

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Servidor escutando requisições em http://localhost:${PORT}`);
    })
}

main();