import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Role } from "./role"

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
}