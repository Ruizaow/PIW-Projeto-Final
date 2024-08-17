import { AppDataSource } from '../data-source';
import { User } from '../models/user';

const userRepository = AppDataSource.getRepository(User);
const regex = {
    "email": /^[a-z0-9.]+@[a-z]+\.[a-z]+$/,
    "password": /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/
}

export const userService = {
    getAll: async() => {
        return await userRepository.find();
    },

    create: async(userData: User) => {
        const thisUserAlreadyExists = await userRepository.findOneBy({ id: userData.id });
        if(thisUserAlreadyExists)
            throw new Error("Usuário já existe.");

        if(regex.email.test(userData.email) && regex.password.test(userData.password))
            return await userRepository.save(userData);
        else {
            let error_msg = "";
            if(!regex.email.test(userData.email))           error_msg += "Email inválido. ";
            if(!regex.password.test(userData.password))     error_msg += "Senha inválida.";
            throw new Error(error_msg);
        }
    },

    update: async(id: number, userData: User) => {
        const user = await userRepository.findOneBy({ id });
        if(!user)
            throw new Error("Usuário não identificado.");
        
        const updatedUser = {
            "id": user.id,
            "name": userData.name,
            "email": userData.email,
            "password": userData.password
        }
        console.log(userData.name)
        
        if(regex.email.test(updatedUser.email) && regex.password.test(updatedUser.password)) {
            await userRepository.update(user, updatedUser);
            return updatedUser;
        }
        else {
            let error_msg = "";
            if(!regex.email.test(updatedUser.email))        error_msg += "Email inválido. ";
            if(!regex.password.test(updatedUser.password))  error_msg += "Senha inválida.";
            throw new Error(error_msg);
        }
    },

    delete: async(id: number) => {
        const user = await userRepository.findOneBy({ id });
        if(!user)
            throw new Error("Usuário não identificado.");
        
        return await userRepository.remove(user);
    }
};