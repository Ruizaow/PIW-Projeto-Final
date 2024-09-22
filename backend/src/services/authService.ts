import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userRepository = AppDataSource.getRepository(User);
export const secret = 'token';

export const authService = {
    login: async(loginData: User) => {
        loginData.password = bcrypt.hashSync(loginData.password, 10)

        const user = await userRepository.findOne({
            where: { username: loginData.username, email: loginData.email },
            relations: ['role']
        });
        if(!user || !bcrypt.compareSync(user.password, loginData.password))
            throw new Error("Login ou senha estão incorretos.");

        const token = jwt.sign({ userId: user.id, userRole: user.role }, secret, { expiresIn: '1h' })

        const data = {
            usuário: user,
            chave: token
        }
        return data;
    }
};