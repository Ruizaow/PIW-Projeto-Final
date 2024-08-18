import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';
import { secret } from '../services/authService';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: Partial<User>;
}
interface JwtPayload {
    id: number;
}

const userRepository = AppDataSource.getRepository(User);

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token)
        return res.status(403).json({ acesso_negado: "Insira uma CHAVE DE AUTENTICAÇÃO para acessar o recurso." });

    try {
        const verified = jwt.verify(token, secret) as JwtPayload;
        req.user = { id: verified.id };
        next();
    } catch(error) {
        res.status(401).json({ acesso_negado: "Chave inválida." });
    }
};

export const authorizeAdmin = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await userRepository.findOneBy({ id: req.user?.id });

    if(user?.role === 'admin')
        next();
    else {
        res.status(403).json({ acesso_negado: "Apenas usuários ADMINISTRADORES podem acessar o recurso." });
    }
};

export const authorizeUser = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await userRepository.findOneBy({ id: req.user?.id });

    if(user?.id === parseInt(req.params.id) || user?.role === 'admin')
        next();
    else {
        if(user?.role === 'user')
            return res.status(403).json({ acesso_negado: 'Usuários NÃO ADMINISTRADORES só podem atualizar o seu próprio cadastro.' });
        res.status(403).json({ acesso_negado: "Apenas usuários AUTENTICADOS podem acessar o recurso." });
    }
};