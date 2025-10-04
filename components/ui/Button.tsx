
import { RingLoader } from 'react-spinners';
import React from "react";
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from "../../utils/style-utils";

const buttonVariants = cva(
    // Base styles
    `relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out transform rounded-xl 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white
    active:scale-[0.98] active:shadow-md
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
    overflow-hidden`,
    {
        variants: {
            variant: {
                contained: `text-white hover:scale-[1.02] hover:shadow-lg shadow-md`,
                outlined: `bg-transparent border-2 hover:text-white hover:scale-[1.02] hover:shadow-md`,
                text: `bg-transparent hover:scale-[1.02]`,
            },
            size: {
                xs: 'px-2 py-0.5 text-xs h-6',
                sm: 'px-3 py-1 text-sm h-8',
                md: 'px-4 py-2 text-sm h-10',
                lg: 'px-6 py-3 text-base h-12',
                xl: 'px-8 py-4 text-lg h-14',
                icon: 'p-1 h-8 w-8',
            },
            color: {
                primary: '',
                secondary: '',
                warm: '',
                blue: '',
                green: '',
                purple: '',
                red: '',
            }
        },
        compoundVariants: [
            // Primary color variants
            {
                variant: 'contained',
                color: 'primary',
                class: 'bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 hover:shadow-primary-500/25 focus:ring-primary-500/50 shadow-primary-500/20'
            },
            {
                variant: 'outlined',
                color: 'primary',
                class: 'text-primary-500 border-primary-500 hover:bg-primary-500 focus:ring-primary-500/50'
            },
            {
                variant: 'text',
                color: 'primary',
                class: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500/50'
            },
            // Secondary color variants
            {
                variant: 'contained',
                color: 'secondary',
                class: 'bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 hover:shadow-secondary-500/25 focus:ring-secondary-500/50 shadow-secondary-500/20'
            },
            {
                variant: 'outlined',
                color: 'secondary',
                class: 'text-secondary-600 border-secondary-500 hover:bg-secondary-500 focus:ring-secondary-500/50'
            },
            {
                variant: 'text',
                color: 'secondary',
                class: 'text-secondary-600 hover:bg-secondary-50 focus:ring-secondary-500/50'
            },
            // Warm color variants
            {
                variant: 'contained',
                color: 'warm',
                class: 'bg-gradient-to-r from-warm-500 to-warm-400 hover:from-warm-600 hover:to-warm-500 hover:shadow-warm-500/25 focus:ring-warm-500/50 shadow-warm-500/20'
            },
            {
                variant: 'outlined',
                color: 'warm',
                class: 'text-warm-600 border-warm-500 hover:bg-warm-500 focus:ring-warm-500/50'
            },
            {
                variant: 'text',
                color: 'warm',
                class: 'text-warm-600 hover:bg-warm-50 focus:ring-warm-500/50'
            },
            // Blue color variants
            {
                variant: 'contained',
                color: 'blue',
                class: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-blue-500/25 focus:ring-blue-500/50 shadow-blue-500/20'
            },
            {
                variant: 'outlined',
                color: 'blue',
                class: 'text-blue-600 border-blue-500 hover:bg-blue-500 focus:ring-blue-500/50'
            },
            {
                variant: 'text',
                color: 'blue',
                class: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500/50'
            },
            // Green color variants
            {
                variant: 'contained',
                color: 'green',
                class: 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 hover:shadow-green-500/25 focus:ring-green-500/50 shadow-green-500/20'
            },
            {
                variant: 'outlined',
                color: 'green',
                class: 'text-green-600 border-green-500 hover:bg-green-500 focus:ring-green-500/50'
            },
            {
                variant: 'text',
                color: 'green',
                class: 'text-green-600 hover:bg-green-50 focus:ring-green-500/50'
            },
            // Purple color variants
            {
                variant: 'contained',
                color: 'purple',
                class: 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 hover:shadow-purple-500/25 focus:ring-purple-500/50 shadow-purple-500/20'
            },
            {
                variant: 'outlined',
                color: 'purple',
                class: 'text-purple-600 border-purple-500 hover:bg-purple-500 focus:ring-purple-500/50'
            },
            {
                variant: 'text',
                color: 'purple',
                class: 'text-purple-600 hover:bg-purple-50 focus:ring-purple-500/50'
            },
            // Red color variants
            {
                variant: 'contained',
                color: 'red',
                class: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 hover:shadow-red-500/25 focus:ring-red-500/50 shadow-red-500/20'
            },
            {
                variant: 'outlined',
                color: 'red',
                class: 'text-red-600 border-red-500 hover:bg-red-500 focus:ring-red-500/50'
            },
            {
                variant: 'text',
                color: 'red',
                class: 'text-red-600 hover:bg-red-50 focus:ring-red-500/50'
            }
        ],
        defaultVariants: {
            variant: 'contained',
            size: 'md',
            color: 'primary',
        },
    }
);

export interface ButtonProps 
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, type, loading, variant, size, color, ...props }, ref) => {
        return (
            <button
                ref={ref}
                {...props}
                type={type || 'submit'}
                className={cn(buttonVariants({ variant, size, color }), className)}
                disabled={loading || props.disabled}
            >
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center space-x-2">
                    {loading ? (
                        <RingLoader color="currentColor" size={20} />
                    ) : (
                        children
                    )}
                </div>
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;