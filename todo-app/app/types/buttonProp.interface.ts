import {ReactNode} from 'react';

export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    // Style props
    color?: string;
    bgColor?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    border?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
    padding?: string | number
    cursor?: string;
    // Hover effects
    hoverColor?: string;
    hoverBgColor?: string;
    // Variants
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}