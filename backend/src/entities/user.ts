import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Movie } from './movie';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.role)
    users: User[];
}

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

    @JoinColumn()
    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @Column()
    profile_picture_Url: string = "";

    @ManyToMany(() => User)
    @JoinTable({
        name: 'user_friends',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'friend_id',
            referencedColumnName: 'id'
        }
    })
    friends: User[];

    @ManyToMany(() => Movie, (movie) => movie.users)
    @JoinTable({
        name: 'user_movies',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'movie_id',
            referencedColumnName: 'id'
        }
    })
    movies: Movie[];
}