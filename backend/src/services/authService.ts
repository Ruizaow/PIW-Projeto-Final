import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userRepository = AppDataSource.getRepository(User);
export const secret = 'token';

export const authService = {
    login: async(data: User) => {
        const login = {
            email: data.email,
            password: bcrypt.hashSync(data.password, data.password.length)
        }
        const user = await userRepository.findOneBy({ email: login.email });
        if(!user || !bcrypt.compareSync(user.password, login.password))
            throw new Error("Email ou senha estão incorretos.");

        return jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    }
};