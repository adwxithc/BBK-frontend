'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  title?: string;
  className?: string;
  onClose?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

/**
 * Reusable component for displaying success messages with consistent styling
 * Supports auto-hide functionality and custom actions
 */
const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  message,
  title,
  className = "",
  onClose,
  autoHide = false,
  autoHideDelay = 3000
}) => {
  React.useEffect(() => {
    if (autoHide && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay, onClose]);

  return (
    <div className={`p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 ${className}`}>
      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      <div className="flex-1">
        {title && <span className="text-green-800 font-medium block">{title}</span>}
        <span className={`text-green-800 ${title ? 'text-sm' : 'font-medium'}`}>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-green-400 hover:text-green-600 transition-colors"
          aria-label="Close success message"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;