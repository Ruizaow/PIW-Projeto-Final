import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, Role } from "./entities/user";
import { Movie, Poster, Review } from "./entities/movie";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  entities: [User, Role, Movie, Poster, Review],
});
