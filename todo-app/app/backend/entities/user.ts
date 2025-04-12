import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {Todo} from "@/app/backend/entities/todo";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({unique: true, length: 50})
    username!: string;

    @Column({unique: true})
    email!: string;

    @Column({select: false})
    password!: string;

    @Column({nullable: true})
    resetPasswordToken!: string;

    @Column({nullable: true})
    resetPasswordExpires!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Todo, todo => todo.user)
    todos!: Todo[];

}