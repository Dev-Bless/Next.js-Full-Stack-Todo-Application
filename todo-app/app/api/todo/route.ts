import { NextResponse } from "next/server";
import {initializeDatabase} from "@/app/backend/db";

export async function GET() {
    try {
        const dataSource = await initializeDatabase();
        return NextResponse.json({
            connected: dataSource.isInitialized,
            message: "Database connection successful"
        });
    } catch (error: any) {
        return NextResponse.json({
            connected: false,
            error: error.message,
        }, { status: 500 });
    }
}