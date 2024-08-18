import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';

const userRepository = AppDataSource.getRepository(User);
const regex = {
    "email": /^[0-9a-zA-Z.]+@[a-z]+\.[a-z]+$/,
    "password": /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/
}

export const userService = {
    getUsers: async() => {
        return await userRepository.find();
    },

    createUser: async(userData: User) => {
        const existingUser = await userRepository.findOneBy({ id: userData.id });
        if(userData.id != null && existingUser)
            throw new Error("Usuário já existe.");

        const missingFields = [];
        if(userData.id == null || userData.id.toString() === '')    missingFields.push("id");
        if(userData.name == null || userData.name === '')           missingFields.push("nome");
        if(userData.email == null || userData.email === '')         missingFields.push("email");
        if(userData.password == null || userData.password === '')   missingFields.push("senha");
        
        if(missingFields.length > 0) {
            const errorMessage = missingFields.length > 1 
                ? `Campos de ${missingFields.join(', ')} vazios` 
                : `Campo de ${missingFields[0]} vazio`;
            throw new Error(errorMessage);
        }
        
        if(userData.role != null) {
            if(userData.role !== 'user' && userData.role !== 'admin')
                throw new Error("Papel de usuário não identificado. Você quis dizer 'user' ou 'admin'?");
        }

        const errors = [];
        if (!regex.email.test(userData.email))          errors.push("Email inválido.");
        if (!regex.password.test(userData.password))    errors.push("Senha inválida.");
        if (errors.length > 0)
            throw new Error(errors.join(" "));

        return await userRepository.save(userData);
    },

    updateUser: async(id: number, userData: User) => {
        const user = await userRepository.findOneBy({ id });
        if(!user)
            throw new Error("Usuário não identificado.");
        
        if(userData.id != null) {
            if(userData.id.toString() === '')
                userData.id = id;
            if(userData.id != id)
                throw new Error("O id do usuário não pode ser alterado.");
        }

        const missingFields = [];
        if(userData.name == null || userData.name === '')           missingFields.push("nome");
        if(userData.email == null || userData.email === '')         missingFields.push("email");
        if(userData.password == null || userData.password === '')   missingFields.push("senha");
        
        if(missingFields.length > 0) {
            const errorMessage = missingFields.length > 1 
                ? `Campos de ${missingFields.join(', ')} vazios` 
                : `Campo de ${missingFields[0]} vazio`;
            throw new Error(errorMessage);
        }

        if(userData.role != null) {
            if(userData.role !== 'user' && userData.role !== 'admin' && userData.role !== '')
                throw new Error("Papel de usuário não identificado.");
            if(userData.role === 'admin')
                throw new Error("Permissão negada.");
        }
        if(userData.role == null || userData.role === '')
            userData.role = "user";
        
        const errors = [];
        if (!regex.email.test(userData.email))          errors.push("Email inválido.");
        if (!regex.password.test(userData.password))    errors.push("Senha inválida.");
        if (errors.length > 0)
            throw new Error(errors.join(" "));

        await userRepository.update(user, userData);
        return await userRepository.findOneBy({ id });
    },

    deleteUser: async(id: number) => {
        const user = await userRepository.findOneBy({ id });
        if(!user)
            throw new Error("Usuário não identificado.");
        
        return await userRepository.remove(user);
    }
};