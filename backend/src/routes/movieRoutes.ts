import { Router } from "express";
import { movieService } from '../services/movieService';
import { authenticateToken, authorizeAdmin, authorizeUser } from '../middleware/authMiddleware';
import { getErrorResponse } from '../utils';

const movieRouter = Router();

movieRouter.get('/', async(req, res) => {
    try {
        const movies = await movieService.getAll();
        res.status(200).json({
            mensagem: "Aqui está a lista de filmes.",
            dados: movies
        });
    } catch(error) {
        res.status(500).json({ erro: getErrorResponse(500, "Erro interno do servidor.", "Falha na leitura do recurso.") });
    }
});

movieRouter.get('/:id', async(req, res) => {
    try {
        const movie = await movieService.get(parseInt(req.params.id));
        res.status(200).json({ 
            mensagem: "Aqui está o filme requisitado e suas informações.",
            dados: movie
        });
    } catch(error) {
        res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", (error as Error).message) });
    }
});

movieRouter.post('/', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const movie = await movieService.create(req.body);
        res.status(200).json({
            mensagem: "Filme CADASTRADO com sucesso!",
            dados: movie
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        switch(errorMessage) {
            case "O id do filme será gerado automaticamente e, portanto, não pode ser atribuido.":
                res.status(401).json({ erro: getErrorResponse(401, "Não autorizado.", errorMessage) });
                break;
            default:
                res.status(400).json({ erro: getErrorResponse(400, "Solicitação inválida.", errorMessage) });
                break;
        }
    }
});

movieRouter.put('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const updatedMovie = await movieService.update(parseInt(req.params.id), req.body);
        res.status(200).json({
            mensagem: "Informações do filme ATUALIZADAS com sucesso!",
            dados: updatedMovie
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        switch(errorMessage) {
            case "O id do filme não pode ser alterado.":
                res.status(401).json({ erro: getErrorResponse(401, "Não autorizado.", errorMessage) });
                break;
            default:
                res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", errorMessage) });
                break;
        }
    }
});

movieRouter.delete('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const deletedMovie = await movieService.delete(parseInt(req.params.id));
        deletedMovie.data.id = deletedMovie.id
        res.status(200).json({
            mensagem:"Filme DELETADO com sucesso!",
            dados: deletedMovie.data
        });
    } catch(error) {
        res.status(404).json({ erro: getErrorResponse(404, "Não encontrado.", (error as Error).message) });
    }
});

export default movieRouter;