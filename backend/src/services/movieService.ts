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
        const missingFields = [];
        if(movieData.title == null || movieData.title === '')                           missingFields.push("título");
        if(movieData.releaseDate == null || movieData.releaseDate.toString() === '')    missingFields.push("ano de lançamento");
        if(movieData.synopsis == null || movieData.synopsis === '')                     missingFields.push("sinopse");
        if(movieData.poster == null || movieData.poster.toString() === '')              missingFields.push("pôster");
        
        if(missingFields.length > 0)
            throw new Error("Preencha todos os campos de informação.");

        const numberRegex = /^[+-]?\d+(\.\d+)?$/;
        if(!numberRegex.test(movieData.releaseDate.toString()))
            throw new Error("O ano de lançamento informado deve ser um valor numérico.");

        const existingTitle = await movieRepository.findOneBy({ title: movieData.title, });
        const existingReleaseDate = await movieRepository.findOneBy({ releaseDate: movieData.releaseDate });
        if(existingTitle && existingReleaseDate) throw new Error("Filme já existe.");

        if(movieData.id != null && movieData.id.toString() !== '')
        throw new Error("O id do filme será gerado automaticamente e, portanto, não pode ser atribuido.");
        movieData.id = createNewId(await movieRepository.find());

        const poster: any = movieData.poster

        let posterInDB = await posterRepository.findOneBy({ imageUrl: poster });
        if(!posterInDB) {
            posterInDB = posterRepository.create({
                id: createNewId(await posterRepository.find()),
                imageUrl: poster
            });
            await posterRepository.save(posterInDB);
        }
        movieData.poster = posterInDB;

        const movie = movieRepository.create(movieData);
        return await movieRepository.save(movie);
  },

    update: async(id: number, movieData: Movie) => {
        const movie = await movieRepository.findOne({ 
            where: { id: id },
            relations: { poster: true }
        });
        if(!movie) throw new Error("Filme não identificado.");

        const missingFields = [];
        if(movieData.title == null || movieData.title === '')                           missingFields.push("título");
        if(movieData.releaseDate == null || movieData.releaseDate.toString() === '')    missingFields.push("ano de lançamento");
        if(movieData.synopsis == null || movieData.synopsis === '')                     missingFields.push("sinopse");
        if(movieData.poster == null || movieData.poster.toString() === '')              missingFields.push("pôster");
        
        if(missingFields.length > 0)
            throw new Error("Preencha todos os campos de informação.");

        const numberRegex = /^[+-]?\d+(\.\d+)?$/;
        if(!numberRegex.test(movieData.releaseDate.toString()))
            throw new Error("O ano de lançamento informado deve ser um valor numérico.");

        const existingTitle = await movieRepository.findOneBy({ title: movieData.title, });
        const existingReleaseDate = await movieRepository.findOneBy({ releaseDate: movieData.releaseDate });
        if(existingTitle && existingReleaseDate) throw new Error("Filme já existe.");

        if(movieData.id != null && movieData.id != id)
            throw new Error("O id do filme não pode ser alterado.");

        const poster: any = movieData.poster

        let posterInDB = await posterRepository.findOneBy({ imageUrl: poster });
        if(!posterInDB) {
            posterInDB = posterRepository.create({
                id: createNewId(await posterRepository.find()),
                imageUrl: poster
            });
            await posterRepository.save(posterInDB);
        }
        movieData.poster = posterInDB;

        movie.title = movieData.title || movie.title;
        movie.releaseDate = movieData.releaseDate || movie.releaseDate;
        movie.synopsis = movieData.synopsis || movie.synopsis;
        movie.poster = movieData.poster;

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