import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { User } from './entity/User';
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

const app = express();
app.use(express.json());

app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

async function main() {
    await AppDataSource.initialize();

    const userData = AppDataSource.getRepository(User);
    const emailRegex = /^[a-z0-9.]+@[a-z]+\.[a-z]+/;

    app.get('/', (req, res) => {
        res.render('index');
    })

    app.get('/users', async (req, res) => {
        const users = await userData.find();
        res.json(users);
    })

    app.post('/users', async (req, res) => {
        const thisUserAlreadyExists = await userData.findOneBy({ id: req.body.id });

        if(thisUserAlreadyExists) {
            return res.status(404).send("Usuário já existe.");
        }

        if(emailRegex.test(req.body.email) && req.body.password.length >= 8) {
            console.log(req.body);
            await userData.save(req.body);

            res.send('Usuário criado com sucesso!');
        }
        else {
            let error_msg = "";
            if(!emailRegex.test(req.body.email)) {
                error_msg += "Email inválido. ";
            }
            if(req.body.password.length < 8) {
                error_msg += "Senha inválida.";
            }
            res.status(401).send(error_msg);
        }
    })

    app.put('/user/:id', async (req, res) => {
        const userId = parseInt(req.params.id);
        const user = await userData.findOneBy({ id: userId });
        
        if(!user){
            return res.status(404).send("Usuário não identificado.");
        }
        
        const data = {
            "id": userId,
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password
        }
            
        if(emailRegex.test(data.email) && data.password.length >= 8) {
            await userData.save(data);
            res.send('Usuário atualizado com sucesso!');
        }
        else {
            let error_msg = "";
            if(!emailRegex.test(data.email)) {
                error_msg += "Email inválido. ";
            }
            if(data.password.length < 8) {
                error_msg += "Senha inválida.";
            }
            res.status(401).send(error_msg);
        }
    })

    app.delete('/user/:id', async (req, res) => {
        const userId = parseInt(req.params.id);
        const user = await userData.findOneBy({ id: userId });
        
        if(!user) {
            return res.status(404).send("Usuário não identificado.");
        }

        await userData.remove(user);
        res.send('Usuário deletado com sucesso!');
    })

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Servidor escutando requisições em http://localhost:${PORT}`);
    })
}

main();