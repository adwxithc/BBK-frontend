
import { RingLoader } from 'react-spinners'
import React from "react";

import { cn } from "../../utils/style-utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, type, loading, ...props }, ref) => {
        return (
            <button
                ref={ref}
                {...props}
                type={type || 'submit'}
                className={cn(
                    `relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-300 ease-in-out transform rounded-xl 
                    bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] 
                    hover:from-[#6BA519] hover:to-[#E8E557] 
                    hover:scale-[1.02] hover:shadow-lg hover:shadow-[#7CBD1E]/25
                    focus:outline-none focus:ring-2 focus:ring-[#7CBD1E]/50 focus:ring-offset-2 focus:ring-offset-white
                    active:scale-[0.98] active:shadow-md
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                    shadow-md shadow-[#7CBD1E]/20
                    overflow-hidden`,
                    className
                )}
                disabled={loading || props.disabled}
            >
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center space-x-2">
                    {loading ? (
                        <RingLoader color="#ffffff" size={20} />
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