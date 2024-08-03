import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

import express from 'express';
import { engine } from 'express-handlebars'
import path from 'path'

const app = express()
app.use(express.json())

app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

async function main() {
    await AppDataSource.initialize();

    const userData = AppDataSource.getRepository(User)

    app.get('/', (req, res) => {
        res.render('index')
    })

    app.get('/users', async (req, res) => {
        const users = await userData.find()
        res.json(users);
    })

    app.post('/users', async (req, res) => {
        console.log(req.body)
        await userData.save(req.body)

        res.send('Ok, deu certo!')
    })

    app.put('/users/:id', async (req, res) => {
        const userId = parseInt(req.params.id)

        const user = await userData.findOneBy({ id: userId })
        
        if(user){
            const data = {
                "id": userId,
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
            }
            await userData.save(data)

            res.send('Ok, deu certo!')
        }
        else {
            res.status(404).send("Error")
        }
    })

    app.delete('/users/:id', async (req, res) => {
        const userId = parseInt(req.params.id)
        
        const user = await userData.findOneBy({ id: userId })
        
        if(user) {
            await userData.remove(user)
            res.redirect('/users')
        }
        else {
            res.status(404).send("Error")
        }
    })

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Servidor escutando requisições em http://localhost:${PORT}`);
    })
}

main();