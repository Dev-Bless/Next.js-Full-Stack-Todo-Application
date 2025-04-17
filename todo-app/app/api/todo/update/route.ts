import {AppDataSource} from "@/app/backend/config/datasource";
import {Todo} from "@/app/backend/entities/todo";
import {NextRequest, NextResponse} from "next/server";
import {getAuthUser} from "@/app/libs/auth";
import {UpdateTodoSchema} from "@/app/schema/todo";

interface RouteParams {
    params: {
        id: string;
    };
}

export async function PUT(request: NextRequest, {params}: RouteParams) {
    try {
        const user = getAuthUser(request);
        if (!user) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const body = await request.json();
        const {data, success, error} = UpdateTodoSchema.safeParse(body);

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
        const todo = await todoRepository.update(params.id, data);

        return NextResponse.json(todo);
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}