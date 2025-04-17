import {z} from "zod";

export const TodoSchema = z.object({
    id: z.string().uuid(),
    task: z.string().min(1, "task is required"),
    isComplete: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().uuid()
});

export type TodoType = z.infer<typeof TodoSchema>;

export const CreateTodoSchema = z.object({
    task: z.string().min(1, "task is required"),
});

export type CreateTodoType = z.infer<typeof CreateTodoSchema>;

export const UpdateTodoSchema = z.object({
    id: z.string().uuid(),
    task: z.string().min(1, "Title is required").optional(),
    isComplete: z.boolean().optional(),
});

export type UpdateTodoType = z.infer<typeof UpdateTodoSchema>;