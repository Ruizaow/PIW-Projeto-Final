import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Movie, Poster } from "../entities/movie";
import { createNewId } from '../utils';

const movieRepository = AppDataSource.getRepository(Movie);
const posterRepository = AppDataSource.getRepository(Poster);

export const movieService = {
    getAll: async () => {
        return await movieRepository.find({ relations: { poster: true } })
    },
    
    get: async(id: number) => {
        const movie = await movieRepository.findOne({ 
            where: { id: id },
            relations: { poster: true }
        });
        if(!movie) throw new Error("Filme não identificado.");

        return movie;
    },

    create: async(movieData: Movie) => {
        const existingMovie = await movieRepository.findOneBy({ title: movieData.title, });
        if(existingMovie) throw new Error("Filme já existe.");

        if(movieData.id != null && movieData.id.toString() !== '')
        throw new Error("O id do filme será gerado automaticamente e, portanto, não pode ser atribuido.");
        movieData.id = createNewId(await movieRepository.find());

        const poster: any = movieData.poster
        try {
            const validateUrl = new URL(poster);
            let posterInDB = await posterRepository.findOneBy({ imageUrl: poster });

            if(!posterInDB) {
                posterInDB = posterRepository.create({
                    id: createNewId(await posterRepository.find()),
                    imageUrl: poster
                });
                await posterRepository.save(posterInDB);
            }
            movieData.poster = posterInDB;
        } catch(error) {
            throw new Error('URL do pôster inválida');
        }

        const movie = movieRepository.create(movieData);
        return await movieRepository.save(movie);
  },

    update: async(id: number, movieData: Movie) => {
        const movie = await movieRepository.findOne({ 
            where: { id: id },
            relations: { poster: true }
        });
        if(!movie) throw new Error("Filme não identificado.");

        if(movieData.id != null && movieData.id != id)
            throw new Error("O id do filme não pode ser alterado.");

        await movieRepository.update(movie.id, movieData);
        return await movieRepository.findOne({ 
            where: { id: id },
            relations: { poster: true }
        });
    },

    delete: async (id: number) => {
        const movie = await movieRepository.findOne({ 
            where: { id: id },
            relations: { poster: true }
        });
        if(!movie) throw new Error("Filme não identificado.");

        const deletedMovie = {
            id: movie.id,
            data: await movieRepository.remove(movie),
        };

        const deletedPoster: any = await posterRepository.findOneBy({ imageUrl: deletedMovie.data.poster?.imageUrl });
        await posterRepository.remove(deletedPoster);

        return deletedMovie;
    },
};