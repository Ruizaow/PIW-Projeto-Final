import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { User } from "./user"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.role)
    users: User[];
}