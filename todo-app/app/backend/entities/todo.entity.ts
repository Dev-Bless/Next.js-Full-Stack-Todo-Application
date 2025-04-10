import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number ;

    @Column()
    title!: string;

    @Column({ default: false })
    isComplete!: boolean;

    @Column({ nullable: true })
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}