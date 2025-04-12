import {z} from "zod"

export const RegisterDtoSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export const LoginDtoSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;


export interface UserResponseDto {
    id: string;
    username: string;
    email: string;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}


export interface AuthResponseDto {
    user: UserResponseDto;
    token: string;
    message: string;
}