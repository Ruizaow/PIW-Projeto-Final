import { Router } from "express";
import { authService } from '../services/authService';

const authRouter = Router();

authRouter.post('/', async(req, res) => {
    try {
        const userData = await authService.login(req.body);
        
        let message = "";
        if(userData.usuário.role.name === 'Administrador')
            message = "Adminstrador LOGADO com sucesso!";
        else
            message = "Usuário LOGADO com sucesso!";

        res.status(200).json({
            mensagem: message,
            dados: {
                usuário: {
                    id: userData.usuário.id,
                    name: userData.usuário.name,
                    username: userData.usuário.username,
                    email: userData.usuário.email,
                    role: {
                        id: userData.usuário.role.id,
                        name: userData.usuário.role.name
                    }
                },
                chave: userData.chave
            }
        });
    } catch(error) {
        res.status(400).json({ 
            erro: {
                status: 400,
                nome: "Solicitação inválida.",
                mensagem: (error as Error).message
            }
        });
    }
});

export default authRouter;