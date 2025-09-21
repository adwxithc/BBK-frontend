'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  wrapperClassName?: string;
}

/**
 * Reusable form input component with consistent styling and validation display
 * Supports icons, helper text, and error states
 */
const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  registration,
  error,
  required = false,
  helperText,
  startIcon,
  endIcon,
  className = "",
  wrapperClassName = "",
  ...props
}) => {
  return (
    <div className={wrapperClassName}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {startIcon}
          </div>
        )}
        
        <input
          id={id}
          {...registration}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent transition-colors ${
            startIcon ? 'pl-10' : ''
          } ${
            endIcon ? 'pr-10' : ''
          } ${
            error ? 'border-red-300' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        
        {endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FormInput;