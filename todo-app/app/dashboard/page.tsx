'use client'
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/hooks";
import {deleteTodo, fetchTodos} from "@/app/redux/slices/todoSlice";
import TodoForm from "@/app/dashboard/todoForm";
import TaskCounter from "@/app/dashboard/taskCount";
import TaskItem from "@/app/dashboard/taskItems";
import {useRouter} from 'next/navigation';
import {logoutUser} from "@/app/redux/slices/authSlice";
import toast from "react-hot-toast";
import AuthGuard from "@/app/(auth)/Guards/AuthGuard";

const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const {todos, loading, error} = useAppSelector((state) => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const deleteATodo = async (id: string) => {
        try {
            await dispatch(deleteTodo(id));
        } catch (error: any) {
            console.error(error.message || "Deleting todo failed");
        }
    }

    const handleToggle = (id: string) => {
        todos.filter((todo) => todo.id === id).map((todo) => {
            todo.isComplete = !todo.isComplete;
            return todo;
        })
    }

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message || 'Logout failed');
        }
    };

    return (
        <AuthGuard>
            <div className="container h-screen bg-[#262626] w-[100%]">
                <div className="bg-[#0D0D0D] flex justify-end p-5 ">
                    <a className="cursor-pointer hover:underline" onClick={handleLogout}>logout</a>
                </div>
                <div className="header bg-[#0D0D0D] flex items-center justify-center w-full h-[24%]">
                    <img src="/logo.svg" alt="logo"/>
                </div>
                <section className="w-[100%] flex flex-col justify-center items-center -mt-8">
                    <div className="w-[60%] relative">
                        <TodoForm/>
                        <div className="mt-10 p-2">
                            <TaskCounter
                            />
                        </div>

                        {loading ? (
                            <div className="text-white text-center mt-4">Loading todos...</div>
                        ) : error ? (
                            <div className="text-red-500 text-center mt-4">{error}</div>
                        ) : (
                            <div>
                                {todos.length > 0 ? (
                                    todos.map(todo => (
                                        <TaskItem
                                            key={todo.id}
                                            text={todo.task}
                                            completed={todo.isComplete}
                                            onDelete={() => deleteATodo(todo.id)}
                                            onToggle={() => handleToggle(todo.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-gray-400 text-center mt-4">
                                        No todos yet. Add one above!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>

        </AuthGuard>
    );
};

export default DashboardPage;