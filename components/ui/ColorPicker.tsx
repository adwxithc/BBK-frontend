'use client';

import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface ColorPickerProps {
  label: string;
  id: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  value: string;
  onChange: (color: string) => void;
  required?: boolean;
  helperText?: string;
  wrapperClassName?: string;
}

/**
 * Reusable color picker component with hex input and visual preview
 * Combines native color input with text input for manual hex entry
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  id,
  registration,
  error,
  value,
  onChange,
  required = false,
  helperText = "Click the color box to open color picker or enter hex value",
  wrapperClassName = "",
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow valid hex color format
    if (/^#[0-9A-Fa-f]{0,6}$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className={wrapperClassName}>
      <label 
        htmlFor={`${id}-picker`} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="flex items-center gap-4">
        {/* Color Picker */}
        <div className="relative">
          <input
            id={`${id}-picker`}
            type="color"
            {...registration}
            value={value}
            className="w-16 h-12 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors"
            title="Choose category color"
          />
          <div 
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: value }}
          />
        </div>
        
        {/* Color Value Display */}
        <div className="flex-1">
          <input
            id={`${id}-text`}
            type="text"
            value={value?.toUpperCase() || ''}
            onChange={handleTextChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent transition-colors font-mono text-sm ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="#FF6B6B"
            maxLength={7}
          />
        </div>
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

export default ColorPicker;