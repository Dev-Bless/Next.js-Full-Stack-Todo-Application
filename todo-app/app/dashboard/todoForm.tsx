'use client';
import Button from "@/app/components/ui/button/button";
import {useAppDispatch} from "@/app/redux/hooks/hooks";
import {AppDispatch, RootState} from '@/app/redux/store';
import {useSelector} from "react-redux";
import React from "react";
import {addTodo, setTodoForm} from "@/app/redux/slices/todoSlice";

const TodoForm = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const {loading, todoForm,} = useSelector((state: RootState) => state.todos);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        dispatch(setTodoForm({field: id, value}));
    }

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(addTodo(todoForm.todo));
            dispatch(setTodoForm({field: "todo", value: ""}));
        } catch (error: any) {
            console.error(error.message || "Adding todo failed");
        }
    }

    return (
        <div className="rounded-lg p-1 flex w-full">
            <form className="flex w-full items-center justify-between bg-gray-800 rounded-lg px-4" onSubmit={addTask}>
                <div className="flex-grow">
                    <input
                        id="todo"
                        className="w-full bg-transparent text-gray-300 py-3 outline-none"
                        type="text"
                        placeholder="What needs to be done?"
                        value={todoForm.todo}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    variant="default"
                    type="submit"
                    className="ml-2 rounded-md px-4 py-2 flex items-center"
                    width="15%"
                >
                    Add
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"/>
                    </svg>
                </Button>
            </form>
        </div>
    );
};

export default TodoForm;