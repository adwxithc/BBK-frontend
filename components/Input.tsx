
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
                        "flex h-12 w-full rounded-md border border-neutral-600 bg-neutral-950 px-3 py-2 text-sm  file:border-0 file:bg-transparent file:pt-[0.34rem]   file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className, `${error && 'border-red-600 hover:border-red-600 focus-visible:ring-red-600  focus-visible:ring-offset-0'}`
                    )}
                    ref={ref}
                    {...props}
                />
                <p className='text-red-600 ml-4 mt-1  text-xs text-left'>{error}</p>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };