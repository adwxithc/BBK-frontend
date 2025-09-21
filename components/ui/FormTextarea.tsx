'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  helperText?: string;
  wrapperClassName?: string;
}

/**
 * Reusable form textarea component with consistent styling and validation display
 * Supports helper text and error states
 */
const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  registration,
  error,
  required = false,
  helperText,
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
      
      <textarea
        id={id}
        {...registration}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent transition-colors resize-none ${
          error ? 'border-red-300' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FormTextarea;