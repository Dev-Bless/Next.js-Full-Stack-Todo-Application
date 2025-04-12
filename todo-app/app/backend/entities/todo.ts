import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import {User} from "@/app/backend/entities/user";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    title!: string;

    @Column({default: false})
    isComplete!: boolean;

    @Column({nullable: true})
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, user => user.todos)
    user!: User;
}

