'use client';

import React from 'react';

interface FormActionsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  cancelText?: string;
  submitText?: string;
  loadingText?: string;
  submitIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  submitType?: 'button' | 'submit';
}

/**
 * Reusable form actions component for consistent cancel/submit buttons
 * Supports loading states, custom text, and icons
 */
const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onSubmit,
  isLoading = false,
  cancelText = "Cancel",
  submitText = "Submit",
  loadingText = "Please wait...",
  submitIcon,
  disabled = false,
  className = "",
  submitType = "submit"
}) => {
  return (
    <div className={`flex gap-3 pt-4 border-t border-gray-200 ${className}`}>
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
      >
        {cancelText}
      </button>
      
      <button
        type={submitType}
        onClick={onSubmit}
        disabled={isLoading || disabled}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {submitIcon}
            {submitText}
          </>
        )}
      </button>
    </div>
  );
};

export default FormActions;