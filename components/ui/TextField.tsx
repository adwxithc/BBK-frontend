import React, { forwardRef, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/style-utils";

/**
 * Enhanced TextField Component with Icon Support
 * 
 * Features:
 * - Front (start) and back (end) icon placement
 * - Clickable icons with hover effects
 * - Multiple variants and sizes
 * - Password visibility toggle (automatic)
 * - Error states and validation
 * - Modern design with gradients and shadows
 * 
 * @example
 * // Basic input with search icon
 * <TextField
 *   placeholder="Search..."
 *   startIcon={<Search className="h-4 w-4" />}
 * />
 * 
 * @example
 * // Input with clickable clear icon
 * <TextField
 *   value={value}
 *   onChange={setValue}
 *   startIcon={<Search className="h-4 w-4" />}
 *   endIcon={<X className="h-4 w-4" />}
 *   onEndIconClick={() => setValue('')}
 * />
 * 
 * @example
 * // Different variants and sizes
 * <Input variant="modern" size="lg" />
 * <Input variant="outlined" size="sm" />
 * <Input variant="default" size="md" />
 * 
 * @example
 * // With label and validation
 * <Input
 *   label="Email Address"
 *   type="email"
 *   required
 *   error={errors.email}
 *   helperText="We'll never share your email"
 * />
 */

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    error?: string;
    label?: string;
    helperText?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onStartIconClick?: () => void;
    onEndIconClick?: () => void;
    variant?: 'default' | 'modern' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    iconSize?: 'sm' | 'md' | 'lg';
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ 
        className, 
        type, 
        error, 
        label, 
        helperText, 
        startIcon, 
        endIcon, 
        onStartIconClick,
        onEndIconClick,
        variant = 'modern', 
        size = 'md',
        iconSize = 'md',
        ...props 
    }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPasswordField = type === "password";
        const inputType = isPasswordField && showPassword ? "text" : type;

        // Size classes
        const sizeClasses = {
            sm: 'h-9 px-3 py-2 text-sm',
            md: 'h-11 px-4 py-2.5 text-sm', 
            lg: 'h-13 px-5 py-3 text-base'
        };

        // Variant classes
        const variantClasses = {
            default: 'border-gray-200 bg-white/50 focus-visible:ring-primary-500/50 focus-visible:border-primary-500',
            modern: 'border-gray-200/60 bg-gradient-to-br from-white via-white to-primary-50/20 focus-visible:ring-primary-500/50 focus-visible:border-primary-500 shadow-sm hover:shadow-md',
            outlined: 'border-2 border-primary-200/60 bg-white/80 focus-visible:ring-primary-500/50 focus-visible:border-primary-500'
        };

        // Calculate padding based on icons
        const getInputPadding = () => {
            let paddingClass = '';
            if (startIcon) {
                if (size === 'sm') paddingClass += 'pl-9 ';
                else if (size === 'lg') paddingClass += 'pl-12 ';
                else paddingClass += 'pl-10 ';
            }
            if (endIcon || isPasswordField) {
                if (size === 'sm') paddingClass += 'pr-9';
                else if (size === 'lg') paddingClass += 'pr-12';
                else paddingClass += 'pr-10';
            }
            return paddingClass;
        };

        return (
            <div className="flex flex-col space-y-2">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <div className="relative group">
                    {/* Start Icon */}
                    {startIcon && (
                        <>
                            {onStartIconClick ? (
                                <button
                                    type="button"
                                    onClick={onStartIconClick}
                                    className={cn(
                                        "absolute top-1/2 -translate-y-1/2 transition-all duration-200 z-10",
                                        "text-gray-500 group-focus-within:text-primary-500",
                                        "hover:text-primary-600 hover:bg-gray-100/80 p-1 rounded-md active:scale-95",
                                        "focus:outline-none focus:ring-2 focus:ring-primary-500/30",
                                        "left-3"
                                    )}
                                    tabIndex={-1}
                                >
                                    {startIcon}
                                </button>
                            ) : (
                                <div className={cn(
                                    "absolute top-1/2 -translate-y-1/2 transition-all duration-200 z-10",
                                    "text-gray-500 group-focus-within:text-primary-500 pointer-events-none",
                                    "left-3"
                                )}>
                                    {startIcon}
                                </div>
                            )}
                        </>
                    )}
                    
                    <input
                        type={inputType}
                        className={cn(
                            "flex w-full rounded-xl border backdrop-blur-sm transition-all duration-300 ease-out",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "placeholder:text-gray-400",
                            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-1",
                            "hover:border-gray-300 hover:shadow-sm",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            sizeClasses[size],
                            variantClasses[variant],
                            getInputPadding(),
                            error && 'border-red-400 hover:border-red-400 focus-visible:ring-red-400/50 focus-visible:border-red-400 bg-red-50/50',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    
                    {/* End Icon or Password Toggle */}
                    {(endIcon || isPasswordField) && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-3 z-10">
                            {isPasswordField ? (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-500 hover:text-gray-600 hover:bg-gray-100/80 transition-all duration-200 focus:outline-none focus:text-gray-600 focus:ring-2 focus:ring-primary-500/30 p-1 rounded-md active:scale-95"
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            ) : (
                                <>
                                    {onEndIconClick ? (
                                        <button
                                            type="button"
                                            onClick={onEndIconClick}
                                            className="text-gray-500 group-focus-within:text-primary-500 hover:text-primary-600 hover:bg-gray-100/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 p-1 rounded-md active:scale-95"
                                            tabIndex={-1}
                                        >
                                            {endIcon}
                                        </button>
                                    ) : (
                                        <div className="text-gray-500 group-focus-within:text-primary-500 transition-all duration-200 pointer-events-none">
                                            {endIcon}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
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

TextField.displayName = "TextField";

export default TextField;