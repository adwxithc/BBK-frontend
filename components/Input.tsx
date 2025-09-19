
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../utils/style-utils";

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <div className="flex flex-col">
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm transition-all duration-200 ease-in-out file:border-0 file:bg-transparent file:pt-[0.34rem] file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CBD1E]/50 focus-visible:border-[#7CBD1E] focus-visible:bg-white/80 hover:bg-white/70 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm",
                        className, 
                        error ? 'border-red-400 hover:border-red-400 focus-visible:ring-red-400/50 focus-visible:border-red-400 bg-red-50/50' : ''
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className='text-red-500 ml-2 mt-1.5 text-xs font-medium animate-in slide-in-from-left-1 duration-200'>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };