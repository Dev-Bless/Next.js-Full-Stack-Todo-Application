'use client';
import { useState } from 'react';
import type { NextPage } from 'next';
import Button from "@/app/components/ui/button/button";

const Again: NextPage = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount(prev => prev + 1);
    };

    const reset =()=>{
        setCount(0)
    };

    const decrement = () =>{
        setCount(prev => prev-1)
    }

    return (
        <div className="container p-5">
            <h1>Next.js Component</h1>
            <p>Count: {count}</p>
            <Button
                className="uppercase tracking-wider shadow-lg"
                bgColor="red"
                hoverBgColor="gray-800"
                padding="10"
            >
                Shop Now
            </Button>
            <button
                onClick={decrement}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-5"
            >
                Decrease
            </button>
            <button
                onClick={reset}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-5"
            >
                Reset
            </button>
            <button
                onClick={increment}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
               Increase
            </button>
        </div>
    );
};

export default Again;