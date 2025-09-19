
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
                className={cn(`inline-flex py-2 px-7 text-base animate-shimmer
        items-center justify-center rounded-md border border-slate-800 
        bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]
          font-medium text-slate-300  transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50`, className)}
            >
                {loading ? <RingLoader color="#004cff" size={26} /> : children}
            </button>
        );
    }
);
Button.displayName = "Button";

export default Button;