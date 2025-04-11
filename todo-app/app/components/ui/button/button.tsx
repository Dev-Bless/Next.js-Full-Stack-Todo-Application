'use client';

import React from "react";
import {Loader2} from 'lucide-react';
import {ButtonProps} from "@/app/types/buttonProp.interface";
import {baseClasses, getSizeClasses, getVariantClasses} from "@/app/constants/button";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
         children,
         onClick,
         type = 'button',
         disabled = false,
         className = '',
         isLoading = false,
         variant = 'default',
         size = 'default',

         color,
         bgColor,
         width = '100%',
         height = 'auto',
         borderRadius = '0.25rem',
         border = 'none',
         fontSize = '1rem',
         fontWeight = 'normal',
         hoverColor,
         hoverBgColor,
         padding,
         cursor = 'pointer',
         ...props
     }, ref) => {
        // Format size helper function
        const formatSize = (value: string | number) =>
            typeof value === 'number' ? `${value}px` : value;


        // Combined btn classes
        const buttonClasses = `${baseClasses} ${getVariantClasses(variant)} ${getSizeClasses(size)} ${className}`;

        return (
            <button
                ref={ref}
                type={type}
                onClick={onClick}
                disabled={disabled || isLoading}
                className={buttonClasses}
                style={{
                    color: color,
                    backgroundColor: bgColor,
                    width: formatSize(width),
                    height: formatSize(height),
                    borderRadius: formatSize(borderRadius),
                    border,
                    fontSize: formatSize(fontSize),
                    fontWeight,
                    padding: padding ? formatSize(padding) : undefined,
                    cursor,
                }}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin"/>
                        {children}
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;