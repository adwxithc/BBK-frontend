'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ApiErrorProps {
  error: any;
  title?: string;
  className?: string;
  onClose?: () => void;
}

/**
 * Reusable component for displaying API error messages with consistent styling
 * Handles different error response formats from backend
 */
const ApiError: React.FC<ApiErrorProps> = ({ 
  error, 
  title = "Error", 
  className = "",
  onClose 
}) => {
  if (!error) return null;

  // Extract error message from different API error response formats
  const getErrorMessage = (error: any): string => {
    // Handle IResponse<T> format with nested errors array
    if (error?.data?.data?.errors?.[0]?.message) {
      return error.data.data.errors[0].message;
    }
    
    // Handle simple message format
    if (error?.data?.message) {
      return error.data.message;
    }
    
    // Handle string errors
    if (typeof error === 'string') {
      return error;
    }
    
    // Handle error objects with message property
    if (error?.message) {
      return error.message;
    }
    
    // Fallback for unknown error formats
    return 'An unexpected error occurred. Please try again.';
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className={`p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 ${className}`}>
      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <span className="text-red-800 font-medium block">{title}</span>
        <span className="text-red-700 text-sm">{errorMessage}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-600 transition-colors"
          aria-label="Close error message"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ApiError;