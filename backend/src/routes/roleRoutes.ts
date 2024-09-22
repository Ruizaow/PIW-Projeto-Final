import { Router } from 'express'
import { AppDataSource } from '../data-source'
import { Role } from '../entities/user'
import { authenticateToken } from '../middleware/authMiddleware'

const roleRepository = AppDataSource.getRepository(Role);
const roleRouter = Router();

// roleRouter.use(authenticateToken);

roleRouter.get('/', async (req, res) => {
    const roles = await roleRepository.find();
    res.json({
        dados: roles
    })
})

roleRouter.put('/:id', async (req, res) => {
    const role = await roleRepository.findOneBy({ id: parseInt(req.params.id) })

    if(!role) {
        return res.status(404).json({
            erro: {
                status: 404,
                nome: "Não encontrado.",
                mensagem: "Papel de usuário não identificado."
            }
        });
    }
    
    if(req.body.name == null || req.body.name === '') {
        return res.status(404).json({
            erro: {
                status: 400,
                nome: "Solicitação inválida.",
                mensagem: "Nome do papel de usuário está vazio."
            }
        });
    }

    role.name = req.body.name;
    res.status(200).json({
        mensagem: "Papel de usuário ATUALIZADO com sucesso!",
        dados: await roleRepository.save(role)
    });
})

roleRouter.delete('/:id', async (req, res) => {
    const role = await roleRepository.findOneBy({ id: parseInt(req.params.id) })

    if(!role) {
        return res.status(404).json({
            erro: {
                status: 404,
                nome: "Não encontrado.",
                mensagem: "Papel de usuário não identificado."
            }
        });
    }
    
    res.status(200).json({
        mensagem: "Papel de usuário DELETADO com sucesso!",
        dados: await roleRepository.remove(role)
    });
})

export default roleRouter;