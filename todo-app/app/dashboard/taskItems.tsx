'use client'
import React from "react";

interface TaskItemProps {
    completed: boolean;
    text: string;
    onDelete: () => void;
    onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({completed, text, onDelete, onToggle}) => {
    return (
        <div className="flex items-center gap-3 p-4 mb-3 bg-gray-800 rounded-lg border border-gray-700">
            <button
                onClick={onToggle}
                className={`flex-shrink-0 w-5 h-5 rounded-full border cursor-pointer ${
                    completed
                        ? "bg-purple-500 border-purple-500 flex items-center justify-center"
                        : "border-blue-500"
                }`}
            >
                {completed && (
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.43059 0.342123L4.09865 4.67406L1.61618 2.19159L0.780273 3.0275L4.09865 6.34587L9.26649 1.17803L8.43059 0.342123Z"
                            fill="white"/>
                    </svg>
                )}
            </button>

            <p className={`flex-grow text-sm ${
                completed ? "text-gray-500 line-through" : "text-gray-300"
            }`}>
                {text}
            </p>

            <button
                onClick={onDelete}
                className="text-gray-500 hover:text-gray-400 cursor-pointer"
            >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 3.00001C10.7616 2.86201 8.52222 2.78134 6.28356 2.75801C5.18222 2.75801 4.08089 2.75801 2.97956 2.75801L1 3.00001"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path
                        d="M4.5 2.50013L4.622 1.84013C4.70978 1.35213 4.77867 1.00013 5.6345 1.00013H8.3655C9.22133 1.00013 9.29733 1.37213 9.378 1.84213L9.5 2.50013"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path
                        d="M11.7802 5.99572L11.3869 12.5224C11.3291 13.3737 11.2802 14.0002 9.81352 14.0002H4.18652C2.71985 14.0002 2.67096 13.3737 2.61318 12.5224L2.21985 5.99572"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};

export default TaskItem;