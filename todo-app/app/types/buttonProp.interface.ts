import React, {ReactNode} from 'react';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    isLoading?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    // Custom style props
    color?: string;
    bgColor?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    border?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
    hoverColor?: string;
    hoverBgColor?: string;
    padding?: string | number;
    cursor?: string;
}