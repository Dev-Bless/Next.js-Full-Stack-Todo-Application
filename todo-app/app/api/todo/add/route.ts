import {AppDataSource} from "@/app/backend/config/datasource";
import {CreateTodoSchema} from "@/app/schema/todo";
import {NextRequest, NextResponse} from "next/server";
import {Todo} from "@/app/backend/entities/todo";
import {getAuthUser} from "@/app/libs/auth";

export async function POST(request: NextRequest) {
    try {
        const user = getAuthUser(request);
        if (!user) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const body = await request.json();
        const {success, error, data} = CreateTodoSchema.safeParse(body);

        if (!success) {
            return NextResponse.json(
                {message: "Invalid request data", errors: error.format()},
                {status: 400}
            );
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const todoRepository = AppDataSource.getRepository(Todo);
        const todo = todoRepository.create({
            ...data,
            user: {id: user.userId}
        });

        await todoRepository.save(todo);

        return NextResponse.json(todo, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}