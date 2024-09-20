import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Movie, Review } from './movie';

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

    @OneToMany(() => Movie, (movie) => movie.user)
    movies: Movie[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}