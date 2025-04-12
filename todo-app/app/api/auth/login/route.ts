import {AppDataSource} from "@/app/backend/config/datasource";
import {AuthResponseDto, LoginDtoSchema} from "@/app/schema/auth";
import {NextRequest, NextResponse} from "next/server";
import {User} from "@/app/backend/entities/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validationResult = LoginDtoSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {errors: validationResult.error.format()},
                {status: 400}
            );
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const {email, password} = validationResult.data;
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: {email},
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!user) {
            return NextResponse.json(
                {error: 'Invalid credentials'},
                {status: 401}
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                {error: 'Invalid credentials'},
                {status: 401}
            );
        }
        
        await userRepository.save(user);

        const token = jwt.sign(
            {userId: user.id, email: user.email},
            process.env.JWT_SECRET || 'fallback-secret',
            {expiresIn: '24h'}
        );


        const {password: _, ...userDto} = user;

        const response: AuthResponseDto = {
            message: 'Login successful',
            user: userDto as any,
            token
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}