import {ButtonSize, ButtonVariant} from "@/app/types/buttonProp.interface";

export const getSizeClasses = (size: ButtonSize): string => {
    switch (size) {
        case 'default':
            return 'h-10 px-4 py-2';
        case 'sm':
            return 'h-9 px-3 py-1 text-sm';
        case 'lg':
            return 'h-11 px-8 py-3';
        case 'icon':
            return 'h-10 w-10 p-2';
        default:
            return 'h-10 px-4 py-2';
    }
};

export const getVariantClasses = (variant: ButtonVariant): string => {
    switch (variant) {
        case 'default':
            return 'bg-blue-600 text-white hover:bg-blue-700 ';
        case 'destructive':
            return 'bg-red-600 text-white hover:bg-red-700';
        case 'outline':
            return 'border border-blue-500 bg-transparent hover:bg-gray-100 hover:border-blue-200 hover:text-black';
        case 'secondary':
            return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
        case 'ghost':
            return 'bg-transparent hover:bg-gray-100';
        case 'link':
            return 'bg-transparent text-blue-600 underline hover:text-blue-800';
        default:
            return 'bg-blue-600 text-white hover:bg-blue-700';
    }
};

export const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none';

