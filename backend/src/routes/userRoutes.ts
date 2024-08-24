import { Router } from "express";
import { userService } from '../services/userService';
import { authenticateToken, authorizeAdmin, authorizeUser } from '../middleware/authMiddleware';

function getErrorResponse(status: number, name: string, message: string) {
    const response = {
        status: status,
        nome: name,
        mensagem: message
    }
    return response
}

const userRouter = Router();
userRouter.use(authenticateToken);

userRouter.get('/', authorizeAdmin, async(req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json({
            mensagem: "Aqui está a lista de usuários.",
            dado: users
        });
    } catch(error) {
        res.status(500).json({ erro: getErrorResponse(500, "Erro interno do servidor.", "Falha na leitura do recurso.") });
    }
});

userRouter.get('/:id', authorizeUser, async(req, res) => {
    try {
        const user = await userService.getUser(parseInt(req.params.id));
        res.status(200).json({ 
            mensagem: "Aqui está o usuário requisitado.",
            dado: user
        });
    } catch(error) {
        res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", (error as Error).message) });
    }
});

userRouter.post('/', authorizeAdmin, async(req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json({
            mensagem: "Usuário CRIADO com sucesso!",
            dado: {
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
            case "Papel de usuário não identificado. Você quis dizer 'user' ou 'admin'?":
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
            default:
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
        }
    }
});

userRouter.put('/:id', authorizeUser, async(req, res) => {
    try {
        const updatedUser = await userService.updateUser(parseInt(req.params.id), req.body);
        res.status(200).json({
            mensagem: "Usuário ATUALIZADO com sucesso!",
            dado: updatedUser
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
            case "Permissão negada.":
                res.status(401).json({ erro: getErrorResponse(403, "Proibido.", errorMessage) });
                break;
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

userRouter.delete('/:id', authorizeAdmin, async(req, res) => {
    try {
        const deletedUser = await userService.deleteUser(parseInt(req.params.id));
        deletedUser.data.id = deletedUser.id
        res.status(200).json({
            mensagem:"Usuário DELETADO com sucesso!",
            dado: deletedUser.data
        });
    } catch(error) {
        res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", (error as Error).message) });
    }
});

export default userRouter;