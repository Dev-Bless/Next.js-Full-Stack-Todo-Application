import {AuthResponseDto, RegisterDtoSchema} from "@/app/schema/auth";
import {NextResponse} from "next/server";
import {AppDataSource} from "@/app/backend/config/datasource";
import {User} from "@/app/backend/entities/user";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validated = RegisterDtoSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json(
                {error: validated.error.format()},
                {status: 400}
            )
        }
        const {username, email, password} = body;

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOne({where: {email: email}});

        if (existingUser) {
            return NextResponse.json(
                {error: 'User already exists'},
                {status: 409}
            );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = userRepository.create({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save(newUser);

        const token = jwt.sign(
            {userId: newUser.id, email: newUser.email},
            process.env.JWT_SECRET || 'fallback-secret',
            {expiresIn: '24h'}
        );

        const {password: _, ...userDto} = newUser;
        const response: AuthResponseDto = {
            message: 'User registered successfully',
            user: userDto as any,
            token
        };

        return NextResponse.json(response, {status: 201});

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}