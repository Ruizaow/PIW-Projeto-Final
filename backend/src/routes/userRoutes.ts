import { Router } from "express";
import { userService } from '../services/userService';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch(error) {
        res.status(500).send("Erro na leitura do recurso.");
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await userService.create(req.body);
        res.json({
            mensagem: "Usuário CRIADO com sucesso!",
            usuário: user
        });
    } catch(error) {
        if((error as Error).message == "Usuário já existe.")
            res.status(400).send((error as Error).message);
        else
            res.status(401).send((error as Error).message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await userService.update(parseInt(req.params.id), req.body);
        res.json({
            mensagem: "Usuário ATUALIZADO com sucesso!",
            usuario: updatedUser
        });
    } catch(error) {
        if((error as Error).message == "Usuário não identificado.")
            res.status(404).send((error as Error).message);
        else
            res.status(401).send((error as Error).message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await userService.delete(parseInt(req.params.id));
        res.json({
            mensagem:"Usuário DELETADO com sucesso!",
            usuario: deletedUser
        });
    } catch(error) {
        res.status(404).send((error as Error).message);
    }
});

export default router;