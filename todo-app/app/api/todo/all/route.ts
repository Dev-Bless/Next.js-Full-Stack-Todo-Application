import {NextRequest, NextResponse} from "next/server";
import {getAuthUser} from "@/app/libs/auth";
import {AppDataSource} from "@/app/backend/config/datasource";
import {Todo} from "@/app/backend/entities/todo";

export async function GET(request: NextRequest) {
    try {
        const user = getAuthUser(request);
        if (!user) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const todoRepository = AppDataSource.getRepository(Todo);
        const todos = await todoRepository.find()

        return NextResponse.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}