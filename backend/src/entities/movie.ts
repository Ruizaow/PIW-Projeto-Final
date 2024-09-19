import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()  // Define que esta classe será uma entidade do banco de dado
export class Movie {
  
  @PrimaryGeneratedColumn()  // Define que a coluna 'id' será a chave primária e seu valor será gerado automaticamente
  id: number;

  @Column()  // Define uma coluna simples para o título do filme
  title: string;

  @Column()  // Define uma coluna para o ano de lançamento do filme
  diretor: string;

  @ManyToOne(() => User, (user) => user.movies)  // Define uma relação ManyToOne (muitos filmes podem ser de um único usuário)
  user: User;  // Relaciona o filme a um usuário
}
