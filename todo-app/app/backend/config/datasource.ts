import "reflect-metadata";
import {DataSource} from "typeorm";
import {Todo} from "@/app/backend/entities/todo";
import {User} from "@/app/backend/entities/user";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV !== "production",
    logging: process.env.NODE_ENV !== "production",
    entities: [Todo, User],
    migrations: ["database/migrations/**/*.ts"],
    subscribers: [],
});