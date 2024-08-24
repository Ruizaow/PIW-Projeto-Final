import { Router } from "express";
import { authService } from '../services/authService';

const authRouter = Router();

authRouter.post('/', async(req, res) => {
    try {
        const userData = await authService.login(req.body);
        
        let message = "";
        if(userData.papel === 'user')
            message = "Usuário LOGADO com sucesso!";
        else
            message = "Adminstrador LOGADO com sucesso!";
        const { papel, ...data } = userData;

        res.status(200).json({
            mensagem: message,
            dado: data
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