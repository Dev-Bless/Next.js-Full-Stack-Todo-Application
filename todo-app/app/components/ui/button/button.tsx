'use client';

import React from "react";
import {ButtonProps} from "@/app/types/buttonProp.interface";

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           onClick,
                                           type = 'button',
                                           disabled = false,
                                           className = '',
                                           color = 'white',
                                           bgColor = 'blue-500',
                                           width = 'auto',
                                           height = 'auto',
                                           borderRadius = '0.25rem',
                                           border = 'none',
                                           fontSize = '1rem',
                                           fontWeight = 'normal',
                                           hoverColor = color,
                                           hoverBgColor = bgColor,
                                           padding = '1px',
                                           cursor = 'pointer',
                                           ...props
                                       }) => {

    const formatSize = (value: string | number) =>
        typeof value === 'number' ? `${value}px` : value;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${className} transition-colors duration-200`}
            style={{
                color,
                backgroundColor: bgColor,
                width: formatSize(width),
                height: formatSize(height),
                borderRadius: formatSize(borderRadius),
                border,
                fontSize: formatSize(fontSize),
                fontWeight,
                padding: formatSize(padding),

                ['--hover-color' as any]: hoverColor,
                ['--hover-bg-color' as any]: hoverBgColor,
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;