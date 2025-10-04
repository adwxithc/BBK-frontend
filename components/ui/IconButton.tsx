import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/style-utils';

const iconButtonVariants = cva(
    // Base styles
    `inline-flex items-center justify-center rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-1 
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:scale-105 active:scale-95`,
    {
        variants: {
            variant: {
                contained: 'text-white shadow-sm hover:shadow-md',
                outlined: 'bg-transparent border-2 hover:text-white',
                text: 'bg-transparent hover:bg-opacity-10',
            },
            size: {
                xs: 'p-0.5 w-5 h-5',
                sm: 'p-1 w-6 h-6',
                md: 'p-1.5 w-7 h-7',
                lg: 'p-2 w-8 h-8',
            },
            color: {
                primary: '',
                secondary: '',
                warm: '',
                blue: '',
                green: '',
                purple: '',
                red: '',
                gray: '',
            }
        },
        compoundVariants: [
            // Primary color variants
            {
                variant: 'contained',
                color: 'primary',
                class: 'bg-primary-500 hover:bg-primary-600 focus:ring-primary-200'
            },
            {
                variant: 'outlined',
                color: 'primary',
                class: 'text-primary-600 border-primary-500 hover:bg-primary-500 focus:ring-primary-200'
            },
            {
                variant: 'text',
                color: 'primary',
                class: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-200'
            },
            // Secondary color variants
            {
                variant: 'contained',
                color: 'secondary',
                class: 'bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-200'
            },
            {
                variant: 'outlined',
                color: 'secondary',
                class: 'text-secondary-600 border-secondary-500 hover:bg-secondary-500 focus:ring-secondary-200'
            },
            {
                variant: 'text',
                color: 'secondary',
                class: 'text-secondary-600 hover:bg-secondary-50 focus:ring-secondary-200'
            },
            // Warm color variants
            {
                variant: 'contained',
                color: 'warm',
                class: 'bg-warm-500 hover:bg-warm-600 focus:ring-warm-200'
            },
            {
                variant: 'outlined',
                color: 'warm',
                class: 'text-warm-600 border-warm-500 hover:bg-warm-500 focus:ring-warm-200'
            },
            {
                variant: 'text',
                color: 'warm',
                class: 'text-warm-600 hover:bg-warm-50 focus:ring-warm-200'
            },
            // Blue color variants
            {
                variant: 'contained',
                color: 'blue',
                class: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-200'
            },
            {
                variant: 'outlined',
                color: 'blue',
                class: 'text-blue-600 border-blue-500 hover:bg-blue-500 focus:ring-blue-200'
            },
            {
                variant: 'text',
                color: 'blue',
                class: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-200'
            },
            // Green color variants
            {
                variant: 'contained',
                color: 'green',
                class: 'bg-green-500 hover:bg-green-600 focus:ring-green-200'
            },
            {
                variant: 'outlined',
                color: 'green',
                class: 'text-green-600 border-green-500 hover:bg-green-500 focus:ring-green-200'
            },
            {
                variant: 'text',
                color: 'green',
                class: 'text-green-600 hover:bg-green-50 focus:ring-green-200'
            },
            // Purple color variants
            {
                variant: 'contained',
                color: 'purple',
                class: 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-200'
            },
            {
                variant: 'outlined',
                color: 'purple',
                class: 'text-purple-600 border-purple-500 hover:bg-purple-500 focus:ring-purple-200'
            },
            {
                variant: 'text',
                color: 'purple',
                class: 'text-purple-600 hover:bg-purple-50 focus:ring-purple-200'
            },
            // Red color variants
            {
                variant: 'contained',
                color: 'red',
                class: 'bg-red-500 hover:bg-red-600 focus:ring-red-200'
            },
            {
                variant: 'outlined',
                color: 'red',
                class: 'text-red-600 border-red-500 hover:bg-red-500 focus:ring-red-200'
            },
            {
                variant: 'text',
                color: 'red',
                class: 'text-red-600 hover:bg-red-50 focus:ring-red-200'
            },
            // Gray color variants
            {
                variant: 'contained',
                color: 'gray',
                class: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-200'
            },
            {
                variant: 'outlined',
                color: 'gray',
                class: 'text-gray-600 border-gray-500 hover:bg-gray-500 focus:ring-gray-200'
            },
            {
                variant: 'text',
                color: 'gray',
                class: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-200'
            }
        ],
        defaultVariants: {
            variant: 'text',
            size: 'md',
            color: 'gray',
        },
    }
);

export interface IconButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color'>,
    VariantProps<typeof iconButtonVariants> {
    icon: React.ReactNode;
    tooltip?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ className, icon, tooltip, variant, size, color, ...props }, ref) => {
        return (
            <button
                ref={ref}
                {...props}
                className={cn(iconButtonVariants({ variant, size, color }), className)}
                title={tooltip}
            >
                {icon}
            </button>
        );
    }
);

IconButton.displayName = 'IconButton';

export default IconButton;