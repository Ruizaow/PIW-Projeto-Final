import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Role } from "./role"
import { Movie } from './movie';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role, role => role.users)
    role: Role;

    @OneToMany(() => Movie, (movie) => movie.user)  // Define uma relação OneToMany: um usuário pode ter vários filmes
    movies: Movie[];  // Define que o usuário terá uma lista de filmes
}