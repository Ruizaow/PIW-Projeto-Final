import { AppDataSource } from './data-source';
import { User } from './entities/user';

const userRepository = AppDataSource.getRepository(User);

export function createNewId(entities: any) {
    if(!entities.length || entities[0].id !== 1)
        return 1;
    for (let i = 1; i < entities.length; i++) {
        if (entities[i].id !== entities[i - 1].id + 1)
            return entities[i - 1].id + 1;
    }
    return entities[entities.length - 1].id + 1;
}

export async function verifyUserProperty(property: keyof User, value: string) {
    const user = await userRepository.findOneBy({ [property]: value });
    return !!user;
}

export function getErrorResponse(status: number, name: string, message: string) {
    const response = {
        status: status,
        nome: name,
        mensagem: message
    }
    return response
}