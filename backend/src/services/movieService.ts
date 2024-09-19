import 'reflect-metadata';  // Importa o módulo para suportar metadados no TypeScript (requerido para TypeORM)
import { AppDataSource } from '../data-source';
import { Movie } from '../entities/movie';
import { User } from '../entities/user';

// Cria repositórios para acessar as tabelas de filmes e usuários
const movieRepository = AppDataSource.getRepository(Movie);
const userRepository = AppDataSource.getRepository(User);

export const movieService = {
  // Função para obter todos os filmes
  getMovies: async () => {
    // Busca todos os filmes no banco de dados, incluindo a relação com o usuário (quem adicionou o filme)
    return await movieRepository.find(/*{ relations: ['user'] }*/);
  },


  //MOSTRA FILME POR ID
  getMovie: async (id: number) => {
    // Busca um filme com base no ID, (incluindo a relação com o usuário --> TALVEZ NÃO SEJA NECESSÁRIO)
    const movie = await movieRepository.findOne({
      where: { id: id },
      //relations: ['user']
    });
    if (!movie) 
        throw new Error("Filme não encontrado.");
        return movie;
  },


     //CADASTRA UM NOVO FILME
  /*createMovie1: async (movieData: Movie) => {
    // Verifica se o ID foi passado, o que não deveria acontecer, pois o ID será gerado automaticamente
    if (movieData.id != null) throw new Error("O ID do filme será gerado automaticamente.");

    // Verifica se o usuário que está adicionando o filme existe no banco de dados
    const user = await userRepository.findOne({ where: { id: movieData.user.id } });
    if (!user) throw new Error("Usuário não encontrado.");

    // Associa o filme ao usuário que está criando
    movieData.user = user;

    // Cria uma nova instância do filme com os dados fornecidos
    const newMovie = movieRepository.create(movieData);

    // Salva o novo filme no banco de dados
    return await movieRepository.save(newMovie);
  },*/
    createMovie: async (movieData: Movie, user: User) => {
      // Verifica se o usuário é admin
      if (user.role.name !== 'admin') {
        throw new Error("Apenas administradores podem criar novos filmes.");
      }
  
      // Verifica se já existe um filme com o mesmo título
      const existingMovie = await movieRepository.findOneBy({ title: movieData.title });
      if (existingMovie) {
        throw new Error("Filme já existe.");
      }
      // Cria e salva o novo filme
      const movie = movieRepository.create(movieData);
      return await movieRepository.save(movie);
    },


    //ADICIONAR UM FILME AO PERFIL -PROVAVELMENTE VA PARA O OUTRO CRUD
    addMovieToProfile: async (movieId: number, user: User) => {
    const movie = await movieRepository.findOneBy({ id: movieId });

    if (!movie) {
      throw new Error("Filme não encontrado.");
    }

    // Adiciona o filme ao perfil do usuário
    user.movies.push(movie);
    return await userRepository.save(user);
  },


  //ATUALIZAR FILMES
    updateMovie: async(id:number, movieData: Movie) => {
        //buscar o filmes poe id
    const movie = await movieRepository.findOne({ where: { id: id } /*,relations:['user']*/});
    if(!movie) throw new Error("Filme não encontrado");

        //Erro o ID NÃO PODE SER PASSADO
    if (movieData.id != null && movieData.id !== id)
        throw new Error("O ID do filme não pode ser alterado.");

        // Atualiza o filme no banco de dados com os novos dados
        await movieRepository.update(movie.id, movieData);

        // Retorna o filme atualizado, incluindo o usuário associado
        return await movieRepository.findOne({ where: { id: id }});

},

//DELETAR UM FILME
deleteMovie: async (id: number) =>{
    const movie = await movieRepository.findOne({ where: { id: id }});
        if (!movie) throw new Error("Filme não encontrado.");

            // Remove o filme do banco de dados
    const deletedMovie = {
        id: movie.id,  // Armazena o ID do filme removido para referência
        data: await movieRepository.remove(movie)  // Remove o filme do banco
      };

    // Retorna os dados do filme removido
    return deletedMovie;

    }
}