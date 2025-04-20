import {NextRequest, NextResponse} from "next/server";
import {getAuthUser} from "@/app/libs/auth";
import {AppDataSource} from "@/app/backend/config/datasource";
import {Todo} from "@/app/backend/entities/todo";

interface RouteParams {
    params: {
        id: string;
    };
}

export async function DELETE(request: NextRequest, {params}: RouteParams) {
    try {
        const user = getAuthUser(request);
        if (!user) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }


        const todoRepository = AppDataSource.getRepository(Todo);

        const todo = await todoRepository.findOne({
            where: {
                id: params.id,
                user: {id: user.userId}
            }
        });

        if (!todo) {
            return NextResponse.json(
                {message: "Todo not found or you don't have permission to delete it"},
                {status: 404}
            );
        }

        await todoRepository.delete(params.id);

        return new NextResponse(null, {status: 204});
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}