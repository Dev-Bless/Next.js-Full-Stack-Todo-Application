import {NextRequest, NextResponse} from "next/server";
import {AppDataSource} from "@/app/backend/config/datasource";
import {Todo} from "@/app/backend/entities/todo";
import {getAuthUser} from "@/app/libs/auth";

interface Params {
    params: {
        id: string;
    };
}

export async function GET(_: NextRequest, {params}: Params) {
    try {
        const user = getAuthUser(_);
        if (!user) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const todoRepository = AppDataSource.getRepository(Todo);
        const todo = await todoRepository.findOneBy({id: params.id});

        if (!todo) {
            return NextResponse.json({message: "Todo not found"}, {status: 404});
        }

        return NextResponse.json(todo);
    } catch (error) {
        console.error("Error fetching todo:", error);
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}