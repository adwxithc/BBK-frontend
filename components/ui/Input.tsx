import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../../utils/style-utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, helperText, ...props }, ref) => {
        return (
            <div className="flex flex-col space-y-2">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
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
                    <p className='text-red-500 ml-2 text-xs font-medium animate-in slide-in-from-left-1 duration-200'>
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p className='text-gray-500 ml-2 text-xs'>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;