import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';
import { Movie } from '../entities/movie';

const userRepository = AppDataSource.getRepository(User);
const movieRepository = AppDataSource.getRepository(Movie);

export const movieService = {
    getAll: async(user_id: number) => {
        const user = await userRepository.findOne({ 
            where: { id: user_id },
            relations: { movies: true }
        });
        if(!user) throw new Error("Usuário não identificado.");

        return user.movies;
    },

    add: async(user_id: number, movie_id: number) => {
        const user = await userRepository.findOne({ 
            where: { id: user_id },
            relations: { movies: true }
        });
        if(!user) throw new Error("Usuário não identificado.");

        const movie = await movieRepository.findOne({
            where: { id: movie_id },
            relations: { poster: true }
        });
        if(!movie) throw new Error("Filme não identificado.");

        if(!user.movies)
            user.movies = [];

        const movieExists = user.movies.some(m => m.id === movie.id);
        if(movieExists)
            throw new Error(`O filme ${movie.title} já está adicionado na sua lista.`);

        user.movies.push(movie);
        await userRepository.save(user);

        return movie;
    },

    remove: async(user_id: number, movie_id: number) => {
        const user = await userRepository.findOne({ 
            where: { id: user_id },
            relations: { movies: true }
        });
        if(!user) throw new Error("Usuário não identificado.");

        const movie = await movieRepository.findOne({
            where: { id: movie_id },
            relations: { poster: true }
        });
        if(!movie) throw new Error("Filme não identificado.");

        const movieExists = user.movies.some(m => m.id === movie.id);
        if(!movieExists)
            throw new Error(`O filme ${movie.title} não está adicionado na sua lista.`);
        
        const movie_index = user.movies.indexOf(movie);
        user.movies.splice(movie_index, 1);
        await userRepository.save(user);

        return movie;
    },
};