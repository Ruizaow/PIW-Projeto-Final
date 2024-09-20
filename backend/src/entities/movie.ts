import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string = "";
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: number;

  @Column()
  synopsis: string;

  @OneToOne(() => Poster, { nullable: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  poster: Poster;

  @OneToMany(() => Review, (review) => review.movie)
  @JoinColumn()
  reviews: Review[];
  
  @ManyToOne(() => User, (user) => user.movies)
  user: User;
}

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  review: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  @JoinColumn()
  movie: Movie;
}