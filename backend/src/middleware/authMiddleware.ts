import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';
import { secret } from '../services/authService';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        export interface Request {
            user?: any;
        }
    }
}

const userRepository = AppDataSource.getRepository(User);

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ 
            erro: {
                status: 401,
                nome: "Não autorizado.",
                mensagem: "Insira uma CHAVE DE AUTENTICAÇÃO para acessar o recurso." 
            }
        });
    }

    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch(error) {
        res.status(403).json({ 
            erro: {
                status: 403,
                nome: "Proibido.",
                mensagem: "Chave inválida." 
            }
        });
    }
};

export const authorizeAdmin = async(req: Request, res: Response, next: NextFunction) => {
    const user = await userRepository.findOne({
        where: { id: req.user?.userId },
        relations: ['role']
    });

    if(user?.role?.name === 'admin')
        next();
    else {
        res.status(403).json({ 
            erro: {
                status: 403,
                nome: "Proibido.",
                mensagem: "Apenas usuários ADMINISTRADORES podem acessar o recurso." 
            }
        });
    }
};

export const authorizeUser = async(req: Request, res: Response, next: NextFunction) => {
    const user = await userRepository.findOne({
        where: { id: req.user?.userId },
        relations: ['role']
    });
    
    if(user?.id === parseInt(req.params.id) || user?.id === parseInt(req.params.user_id) || user?.role?.name === 'admin')
        next();
    else {
        if(user?.role?.name === 'user') {
            return res.status(403).json({ 
                erro: {
                    status: 403,
                    nome: "Proibido.",
                    mensagem: "Usuários NÃO ADMINISTRADORES só podem acessar ou atualizar suas próprias informações." 
                }
            });
        }
        res.status(403).json({ 
            erro: {
                status: 403,
                nome: "Proibido.",
                mensagem: "Apenas usuários AUTENTICADOS podem acessar o recurso." 
            }
        });
    }
};