import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';

const userRepository = AppDataSource.getRepository(User);

export const friendService = {
    getAll: async(user_id: number) => {
        const user = await userRepository.findOne({ 
            where: { id: user_id },
            relations: { friends: true }
        });
        if(!user) throw new Error("Usuário não identificado.");

        return user.friends;
    },

    add: async(user_id: number, friend_id: number) => {
        if(user_id === friend_id) throw new Error(`Você não pode se auto adicionar como amigo.`);

        const user = await userRepository.findOne({ 
            where: { id: user_id },
            relations: { friends: true }
        });
        if(!user) throw new Error("Usuário não identificado.");

        const userToBeFriend = await userRepository.findOne({
            where: { id: friend_id },
            relations: { friends: true }
        });
        if(!userToBeFriend) throw new Error("Usuário a ser adicionado como amigo não identificado.");

        if(!user.friends)           user.friends = [];
        if(!userToBeFriend.friends) userToBeFriend.friends = [];

        const alreadyFriend = user.friends.some(f => f.id === userToBeFriend.id);
        if(alreadyFriend)
            throw new Error(`O usuário ${userToBeFriend.username} já está adicionado na sua lista de amigos.`);

        user.friends.push(userToBeFriend);
        userToBeFriend.friends.push(user);

        await userRepository.save(user);
        await userRepository.save(userToBeFriend);

        const friend = {
            id: userToBeFriend.id,
            username: userToBeFriend.username,
            email: userToBeFriend.email,
        }
        return friend;
    },

    remove: async(user_id: number, friend_id: number) => {
        if(user_id === friend_id) throw new Error(`Você não pode se auto remover como amigo. Afinal, você não pode se adicionar como seu próprio amigo.`);

        const user = await userRepository.findOne({ 
            where: { id: user_id },
            relations: { friends: true }
        });
        if(!user) throw new Error("Usuário não identificado.");

        const friendToBeRemoved = await userRepository.findOne({
            where: { id: friend_id },
            relations: { friends: true }
        });
        if(!friendToBeRemoved) throw new Error("Amigo a ser removido não identificado.");

        const isFriend = user.friends.some(f => f.id === friendToBeRemoved.id);
        if(!isFriend)
            throw new Error(`O usuário ${friendToBeRemoved.username} não está adicionado na sua lista de amigos.`);

        if(!user.friends)               user.friends = [];
        if(!friendToBeRemoved.friends)  friendToBeRemoved.friends = [];
        
        user.friends = user.friends.filter(f => f.id !== friendToBeRemoved.id);
        friendToBeRemoved.friends = friendToBeRemoved.friends.filter(u => u.id !== user.id);
        
        await userRepository.save(user);
        await userRepository.save(friendToBeRemoved);

        const removedFriend = {
            id: friendToBeRemoved.id,
            username: friendToBeRemoved.username,
            email: friendToBeRemoved.email,
        }
        return removedFriend;
    },
};