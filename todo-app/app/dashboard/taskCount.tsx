'use client'
import {useAppSelector} from "@/app/redux/hooks/hooks";

const TaskCounter = () => {
    const todos = useAppSelector((state) => state.todos.todos);

    return (
        <div className="flex justify-between w-full border-b border-gray-700 pb-6 mb-6">
            <div className="flex items-center">
                <span className="text-blue-400 font-bold text-sm mr-2">Created tasks</span>
                <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">{todos.length}</span>
            </div>
            <div className="flex items-center">
                <span className="text-purple-400 font-bold text-sm mr-2">Completed</span>
                <span
                    className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">{todos.filter(todo => todo.isComplete).length}</span>
            </div>
        </div>
    );
};

export default TaskCounter;