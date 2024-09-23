import { Router } from "express";
import { friendService } from '../services/list_of_friendsService';
import { authenticateToken, authorizeUser } from '../middleware/authMiddleware';
import { getErrorResponse } from '../utils';

const friendRouter = Router();

friendRouter.get('/:user_id/friends', async(req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);

        const friends = await friendService.getAll(user_id);
        res.status(200).json({
            mensagem: `Aqui está a sua lista de amigos.`,
            dados: friends
        });
    } catch(error) {
        res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", (error as Error).message) });
    }
});

friendRouter.post('/:user_id/friends/:friend_id', /* authenticateToken, authorizeUser, */ async(req, res) => {
    try {
        const user_id = parseInt(req.params.user_id,);
        const friend_id = parseInt(req.params.friend_id);
    
        const friend = await friendService.add(user_id, friend_id);
        res.status(200).json({
            mensagem: `Usuário ${friend.username} ADICIONADO na sua lista de amigos com sucesso!`,
            dados: friend
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        switch(errorMessage) {
            case "Usuário não identificado.":
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
            case "Usuário a ser adicionado como amigo não identificado.":
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
            default:
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
        }
    }
});

friendRouter.delete('/:user_id/friends/:friend_id', /*  authenticateToken, authorizeUser, */ async(req, res) => {
    try {
        const user_id = parseInt(req.params.user_id,);
        const friend_id = parseInt(req.params.friend_id);

        const friend = await friendService.remove(user_id, friend_id);
        res.status(200).json({
            mensagem: `Usuário ${friend.username} REMOVIDO da sua lista de amigos com sucesso!`,
            dados: friend
        });
    } catch(error) {
        res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", (error as Error).message) });
    }
});

export default friendRouter;