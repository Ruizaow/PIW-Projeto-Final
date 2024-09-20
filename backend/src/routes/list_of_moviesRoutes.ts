import { Router } from "express";
import { movieService } from '../services/list_of_moviesService';
import { authenticateToken, authorizeUser } from '../middleware/authMiddleware';
import { getErrorResponse } from '../utils';

const movieRouter = Router();

movieRouter.get('/:user_id/films', async(req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);

        const movies = await movieService.getAll(user_id);
        res.status(200).json({
            mensagem: `Aqui está a sua lista de filmes.`,
            dados: movies
        });
    } catch(error) {
        res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", (error as Error).message) });
    }
});

movieRouter.post('/:user_id/films/:movie_id', authenticateToken, authorizeUser, async(req, res) => {
    try {
        const user_id = parseInt(req.params.user_id,);
        const movie_id = parseInt(req.params.movie_id);
    
        const movie = await movieService.add(user_id, movie_id);
        res.status(200).json({
            mensagem: `Filme ${movie.title} ADICIONADO na sua lista com sucesso!`,
            dados: movie
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        switch(errorMessage) {
            case "Usuário não identificado.":
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
            case "Filme não identificado.":
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
            default:
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
        }
    }
});

movieRouter.delete('/:user_id/films/:movie_id', authenticateToken, authorizeUser, async(req, res) => {
    try {
        const user_id = parseInt(req.params.user_id,);
        const movie_id = parseInt(req.params.movie_id);

        const movie = await movieService.remove(user_id, movie_id);
        res.status(200).json({
            mensagem: `Filme ${movie.title} REMOVIDO da sua lista com sucesso!`,
            dados: movie
        });
    } catch(error) {
        res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", (error as Error).message) });
    }
});

export default movieRouter;