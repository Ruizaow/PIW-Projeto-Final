import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Role } from "./entities/role";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  entities: [User, Role],
});
