import { Router } from "express";
import { userService } from '../services/userService';
import friendRouter from '../routes/list_of_friendsRoutes';
import movieRouter from '../routes/list_of_moviesRoutes';
import { authenticateToken, authorizeAdmin, authorizeUser } from '../middleware/authMiddleware';
import { getErrorResponse } from '../utils';

const userRouter = Router();

userRouter.get('/', async(req, res) => {
    try {
        const users = await userService.getAll();
        //const usersWithoutPassword = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

        res.status(200).json({
            mensagem: "Aqui está a lista de usuários.",
            dados: users
        });
    } catch(error) {
        res.status(500).json({ erro: getErrorResponse(500, "Erro interno do servidor.", "Falha na leitura do recurso.") });
    }
});

userRouter.get('/:id', async(req, res) => {
    try {
        const user = await userService.get(parseInt(req.params.id));
        //const { password, ...userWithoutPassword } = user;

        res.status(200).json({ 
            mensagem: "Aqui está o usuário requisitado.",
            dados: user
        });
    } catch(error) {
        res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", (error as Error).message) });
    }
});

userRouter.post('/', async(req, res) => {
    try {
        const user = await userService.create(req.body);
        res.status(200).json({
            mensagem: "Usuário CADASTRADO com sucesso!",
            dados: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
            }
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        switch(errorMessage) {
            case "Usuário já existe.":
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
            case "Email inválido. Digite seu endereço, seguido de @, domínio e .com":
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
            case "Senha inválida. Digite no mínimo 8 caracteres, com pelo menos um dígito e uma letra.":
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
            case "O id do usuário será gerado automaticamente e, portanto, não pode ser atribuido.":
                res.status(401).json({ erro: getErrorResponse(401, "Não autorizado.", errorMessage) });
                break;
            case "Papel de usuário não identificado.":
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
            default:
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
        }
    }
});

userRouter.put('/:id', authenticateToken, authorizeUser, async(req, res) => {
    try {
        const updatedUser = await userService.update(parseInt(req.params.id), req.body);
        res.status(200).json({
            mensagem: "Usuário ATUALIZADO com sucesso!",
            dados: updatedUser
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        switch(errorMessage) {
            case "Email inválido. Digite seu endereço, seguido de @, domínio e .com":
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
            case "O id do usuário não pode ser alterado.":
                res.status(401).json({ erro: getErrorResponse(401, "Não autorizado.", errorMessage) });
                break;
            /* case "Permissão negada.":
                res.status(403).json({ erro: getErrorResponse(403, "Proibido.", errorMessage) });
                break; */
            case "Usuário não identificado.":
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
            case "Papel de usuário não identificado.":
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
            default:
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
        }
    }
});

userRouter.delete('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const deletedUser = await userService.delete(parseInt(req.params.id));
        deletedUser.data.id = deletedUser.id
        res.status(200).json({
            mensagem:"Usuário DELETADO com sucesso!",
            dados: deletedUser.data
        });
    } catch(error) {
        res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", (error as Error).message) });
    }
});

userRouter.use('/', friendRouter);
userRouter.use('/', movieRouter);

export default userRouter;
