import { Router } from "express";
import { userService } from '../services/userService';
import { authenticateToken, authorizeAdmin, authorizeUser } from '../middleware/authorization';

const userRouter = Router();

userRouter.get('/', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch(error) {
        res.status(500).json({ erro: "Falha na leitura do recurso." });
    }
});

userRouter.post('/', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.json({
            mensagem: "Usuário CRIADO com sucesso!",
            usuário: user
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        switch(errorMessage) {
            case "Usuário já existe.":
                res.status(400).json({ erro: errorMessage });
                break;
            case "Email inválido.":
            case "Senha inválida.":
            case "Email inválido. Senha inválida.":
                res.status(401).json({ erro: errorMessage });
                break;
            case "Papel de usuário não identificado. Você quis dizer 'user' ou 'admin'?":
                res.status(404).json({ erro: errorMessage });
                break;
            default:
                res.status(404).json({ erro: errorMessage });
                break;
        }
    }
});

userRouter.put('/:id', authenticateToken, authorizeUser, async(req, res) => {
    try {
        const updatedUser = await userService.updateUser(parseInt(req.params.id), req.body);
        res.json({
            mensagem: "Usuário ATUALIZADO com sucesso!",
            usuario: updatedUser
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        switch(errorMessage) {
            case "O id do usuário não pode ser alterado.":
                res.status(401).json({ erro: errorMessage });
                break;
            case "Email inválido.":
            case "Senha inválida.":
            case "Email inválido. Senha inválida.":
                res.status(401).json({ erro: errorMessage });
                break;
            case "Permissão negada.":
                res.status(403).json({ erro: errorMessage });
                break;
            case "Usuário não identificado.":
                res.status(404).json({ erro: errorMessage });
                break;
            case "Papel de usuário não identificado.":
                res.status(404).json({ erro: errorMessage });
                break;
            default:
                res.status(404).json({ erro: errorMessage });
                break;
        }
    }
});

userRouter.delete('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const deletedUser = await userService.deleteUser(parseInt(req.params.id));
        res.json({
            mensagem:"Usuário DELETADO com sucesso!",
            usuario: deletedUser
        });
    } catch(error) {
        res.status(404).json({ erro: (error as Error).message });
    }
});

export default userRouter;