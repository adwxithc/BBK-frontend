
import { RingLoader } from 'react-spinners'
import React from "react";
import { cn } from "../../utils/style-utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, type, loading, variant = 'primary', size = 'md', ...props }, ref) => {
        const baseClasses = `relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out transform rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white
            active:scale-[0.98] active:shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
            overflow-hidden`;

        const variants = {
            primary: `text-white bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] 
                hover:from-[#6BA519] hover:to-[#E8E557] 
                hover:scale-[1.02] hover:shadow-lg hover:shadow-[#7CBD1E]/25
                focus:ring-[#7CBD1E]/50 shadow-md shadow-[#7CBD1E]/20`,
            secondary: `text-gray-700 bg-white border border-gray-300 
                hover:bg-gray-50 hover:scale-[1.02] hover:shadow-md
                focus:ring-gray-500/50 shadow-sm`,
            danger: `text-white bg-gradient-to-r from-red-600 to-red-500 
                hover:from-red-700 hover:to-red-600 
                hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/25
                focus:ring-red-500/50 shadow-md shadow-red-500/20`,
            ghost: `text-gray-700 bg-transparent 
                hover:bg-gray-100 hover:scale-[1.02]
                focus:ring-gray-500/50`
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-8 py-3 text-base',
            lg: 'px-10 py-4 text-lg'
        };

        return (
            <button
                ref={ref}
                {...props}
                type={type || 'submit'}
                className={cn(baseClasses, variants[variant], sizes[size], className)}
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