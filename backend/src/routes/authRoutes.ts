import { Router } from "express";
import { authService } from '../services/authService';

const authRouter = Router();

authRouter.post('/login', async(req, res) => {
    try {
        const token = await authService.login(req.body);
        res.json({
            mensagem: "Usuário LOGADO com sucesso!",
            chave: token
        });
    } catch(error) {
        res.status(401).json({ erro: (error as Error).message } );
    }
});

export default authRouter;