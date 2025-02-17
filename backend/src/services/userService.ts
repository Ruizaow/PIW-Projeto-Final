import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User, Role } from '../entities/user';
import { createNewId, verifyUserProperty } from '../utils';

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);
const regex = {
    "email": /^[0-9a-zA-Z.]+@[a-z]+\.[a-z]+$/,
    "password": /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/
}

export const userService = {
    getAll: async() => {
        return await userRepository.find({ relations: ['role'] });
    },

    get: async(id: number) => {
        const user = await userRepository.findOne({
            where: { id: id },
            relations: ['role']
        });
        if(!user) throw new Error("Usuário não identificado.");
        
        return user;
    },

    create: async(userData: User) => {
        const existingUser = await userRepository.findOneBy({ id: userData.id });
        if(userData.id != null && existingUser) throw new Error("Usuário já existe.");

        const missingFields = [];
        if(userData.name == null || userData.name === '')           missingFields.push("nome completo");
        if(userData.username == null || userData.username === '')   missingFields.push("nome de usuário");
        if(userData.email == null || userData.email === '')         missingFields.push("email");
        if(userData.password == null || userData.password === '')   missingFields.push("senha");
        if(userData.role == null || userData.role.name === '')      missingFields.push("papel do usuário");
        
        if(missingFields.length > 0) {
            const errorMessage = missingFields.length > 1 
                ? `Campos de ${missingFields.join(', ')} vazios` 
                : `Campo de ${missingFields[0]} vazio`;
            throw new Error(errorMessage);
        }

        let role: any = userData.role
        if(role !== 'Usuário padrão' && role !== 'Usuário premium' && role !== 'Administrador')
            throw new Error("Papel de usuário não identificado.");

        let roleInDB = await roleRepository.findOneBy({ name: role });
        if(!roleInDB) {
            roleInDB = roleRepository.create({ name: role })
            roleInDB.id = createNewId(await roleRepository.find());
            await roleRepository.save(roleInDB)
        }
        userData.role = roleInDB;
        
        const existingProperties = [];
        if(await verifyUserProperty('username', userData.username)) existingProperties.push("Nome de usuário");
        if(await verifyUserProperty('email', userData.email))   	existingProperties.push("Email");

        if(existingProperties.length > 0) {
            const errorMessage = existingProperties.length > 1 
                ? `${existingProperties.join(' e ')} já existem.` 
                : `${existingProperties[0]} já existe.`;
            throw new Error(errorMessage);
        }

        if(userData.email != null && !regex.email.test(userData.email))             throw new Error("Email inválido. Digite seu endereço, seguido de @, domínio e .com");
        if(userData.password != null && !regex.password.test(userData.password))    throw new Error("Senha inválida. Digite no mínimo 8 caracteres, com pelo menos um dígito e uma letra.");

        if(userData.id != null && userData.id.toString() !== '')
            throw new Error("O id do usuário será gerado automaticamente e, portanto, não pode ser atribuido.");
        userData.id = createNewId(await userRepository.find());

        if(userData.profile_picture_Url == null) userData.profile_picture_Url = "";

        return await userRepository.save(userData);
    },

    update: async(id: number, userData: User) => {
        const user = await userRepository.findOne({
            where: { id: id },
            relations: ['role']
        });
        if(!user) throw new Error("Usuário não identificado.");
        
        if(userData.id != null) {
            if(userData.id.toString() === '')
                userData.id = id;
            if(userData.id != id)
                throw new Error("O id do usuário não pode ser alterado.");
        }
        
        let role: any = userData.role
        if(role !== 'Usuário padrão' && role !== 'Usuário premium' && role !== 'Administrador')
            throw new Error("Papel de usuário não identificado.");

        let roleInDB = await roleRepository.findOneBy({ name: role });
        if(!roleInDB) {
            roleInDB = roleRepository.create({ name: role })
            roleInDB.id = createNewId(await roleRepository.find());
            await roleRepository.save(roleInDB)
        }
        userData.role = roleInDB;

        if(userData.email != null && !regex.email.test(userData.email))             throw new Error("Email inválido. Digite seu endereço, seguido de @, domínio e .com");
        if(userData.password != null && !regex.password.test(userData.password))    throw new Error("Senha inválida. Digite no mínimo 8 caracteres, com pelo menos um dígito e uma letra.");
    
        user.name = userData.name || user.name;
        user.username = userData.username || user.username;
        user.email = userData.email || user.email;
        user.password = userData.password || user.password;
        user.role = userData.role;
        user.profile_picture_Url = userData.profile_picture_Url || user.profile_picture_Url

        return await userRepository.save(user);
    },

    delete: async(id: number) => {
        const user = await userRepository.findOne({
            where: { id: id },
            relations: ['role']
        });
        if(!user) throw new Error("Usuário não identificado.");
        
        const deletedUser = {
            id: user.id,
            data: await userRepository.remove(user)
        };
        return deletedUser;
    }
};