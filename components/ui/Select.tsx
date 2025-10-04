import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, X, Check, Search } from 'lucide-react';
import { cn } from '../../utils/style-utils';

const selectVariants = cva(
    // Base styles with modern design
    `relative inline-flex items-center justify-between w-full rounded-xl border-2 
    transition-all duration-300 ease-out group
    focus:outline-none focus:ring-4 focus:ring-offset-1 
    disabled:opacity-50 disabled:cursor-not-allowed
    cursor-pointer shadow-sm hover:shadow-md
    backdrop-blur-sm bg-white/95`,
    {
        variants: {
            variant: {
                default: `border-gray-200 hover:border-gray-300 focus:border-primary-400 
                    focus:ring-primary-100 hover:bg-white
                    shadow-gray-100/50 hover:shadow-gray-200/50`,
                outlined: `border-2 border-primary-200 hover:border-primary-300 
                    focus:border-primary-500 focus:ring-primary-200/60
                    bg-gradient-to-br from-white to-primary-50/30
                    shadow-primary-100/30 hover:shadow-primary-200/40`,
                filled: `bg-gradient-to-br from-gray-50 to-gray-100/80 border-gray-200 
                    hover:from-gray-100 hover:to-gray-150 hover:border-gray-300
                    focus:bg-white focus:border-primary-400 focus:ring-primary-200/60
                    shadow-gray-100/40`,
                modern: `bg-gradient-to-br from-white via-white to-primary-50/20 
                    border-primary-200/60 hover:border-primary-300/80
                    focus:border-primary-500 focus:ring-primary-200/50
                    shadow-lg shadow-primary-100/20 hover:shadow-xl hover:shadow-primary-200/30
                    backdrop-blur-lg`,
            },
            size: {
                sm: 'px-3 py-2 text-sm h-9 rounded-lg',
                md: 'px-4 py-2.5 text-sm h-11 rounded-xl',
                lg: 'px-5 py-3 text-base h-13 rounded-xl',
            },
            color: {
                default: '',
                primary: 'focus:border-primary-500 focus:ring-primary-200/60',
                secondary: 'focus:border-secondary-500 focus:ring-secondary-200/60',
                warm: 'focus:border-warm-500 focus:ring-warm-200/60',
            }
        },
        defaultVariants: {
            variant: 'modern',
            size: 'md',
            color: 'primary',
        },
    }
);

const dropdownVariants = cva(
    `absolute z-50 mt-2 w-full bg-white/95 backdrop-blur-xl border border-gray-200/80 
    rounded-xl shadow-2xl shadow-gray-900/10 max-h-64 overflow-hidden
    animate-in fade-in-0 zoom-in-95 duration-200 ease-out
    ring-1 ring-black/5`,
    {
        variants: {
            position: {
                bottom: 'top-full',
                top: 'bottom-full mb-2',
            }
        },
        defaultVariants: {
            position: 'bottom',
        },
    }
);

const optionVariants = cva(
    `relative flex items-center px-4 py-3 cursor-pointer transition-all duration-200 ease-out
    group/option border-l-2 border-transparent`,
    {
        variants: {
            state: {
                default: `text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r 
                    hover:from-gray-50 hover:to-gray-100/50
                    hover:border-l-primary-300 hover:pl-5`,
                selected: `text-primary-700 bg-gradient-to-r from-primary-50 to-primary-100/60 
                    border-l-primary-500 font-medium
                    shadow-sm shadow-primary-100/50`,
                disabled: `text-gray-400 cursor-not-allowed bg-gray-50/50`,
            }
        },
        defaultVariants: {
            state: 'default',
        },
    }
);

/**
 * Modern Select Component
 * 
 * @example
 * // Single select with modern design
 * <Select
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]}
 *   variant="modern"
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 * 
 * // Multi-select with search
 * <Select
 *   options={options}
 *   variant="outlined"
 *   multiple
 *   searchable
 *   clearable
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 * />
 * 
 * // Different variants: 'default', 'outlined', 'filled', 'modern'
 * // Sizes: 'sm', 'md', 'lg'
 * // Colors: 'default', 'primary', 'secondary', 'warm'
 */

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export interface SelectProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'color'>,
    VariantProps<typeof selectVariants> {
    options: SelectOption[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    placeholder?: string;
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    loading?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    maxSelections?: number;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    ({
        className,
        options,
        value,
        onChange,
        placeholder = 'Select option...',
        multiple = false,
        searchable = false,
        clearable = false,
        loading = false,
        disabled = false,
        error = false,
        helperText,
        maxSelections,
        variant,
        size,
        color,
        ...props
    }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [searchTerm, setSearchTerm] = useState('');
        const selectRef = useRef<HTMLDivElement>(null);
        const searchInputRef = useRef<HTMLInputElement>(null);

        // Convert value to array for consistent handling
        const selectedValues = React.useMemo(() => {
            if (multiple) {
                return Array.isArray(value) ? value : [];
            } else {
                return value ? [value as string] : [];
            }
        }, [value, multiple]);

        // Filter options based on search term
        const filteredOptions = searchTerm
            ? options.filter(option =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : options;

        // Get selected option labels for display
        const getDisplayText = () => {
            if (selectedValues.length === 0) return placeholder;
            
            if (multiple) {
                if (selectedValues.length === 1) {
                    const option = options.find(opt => opt.value === selectedValues[0]);
                    return option?.label || selectedValues[0];
                }
                return `${selectedValues.length} selected`;
            } else {
                const option = options.find(opt => opt.value === selectedValues[0]);
                return option?.label || selectedValues[0];
            }
        };

        // Handle option selection
        const handleOptionSelect = (optionValue: string) => {
            if (multiple) {
                handleMultipleSelection(optionValue);
            } else {
                handleSingleSelection(optionValue);
            }
        };

        const handleMultipleSelection = (optionValue: string) => {
            let newValues;
            if (selectedValues.includes(optionValue)) {
                newValues = selectedValues.filter(v => v !== optionValue);
            } else {
                if (maxSelections && selectedValues.length >= maxSelections) {
                    return; // Don't add if max selections reached
                }
                newValues = [...selectedValues, optionValue];
            }
            onChange?.(newValues);
        };

        const handleSingleSelection = (optionValue: string) => {
            onChange?.(optionValue);
            setIsOpen(false);
            setSearchTerm('');
        };

        // Handle clear all
        const handleClear = (e: React.MouseEvent) => {
            e.stopPropagation();
            onChange?.(multiple ? [] : '');
        };

        // Handle outside click
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                    setSearchTerm('');
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        // Focus search input when dropdown opens
        useEffect(() => {
            if (isOpen && searchable && searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, [isOpen, searchable]);

        const showClearButton = clearable && selectedValues.length > 0 && !disabled;

        return (
            <div className="relative" ref={selectRef}>
                {/* Select Button */}
                <button
                    type="button"
                    className={cn(
                        selectVariants({ variant, size, color }),
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-200/60',
                        isOpen && 'ring-4 ring-primary-200/60 border-primary-400',
                        className
                    )}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                >
                    {/* Content Container */}
                    <div className="flex items-center flex-1 min-w-0">
                        <span className={cn(
                            'flex-1 truncate text-left transition-all duration-200',
                            selectedValues.length === 0 && 'text-gray-500',
                            selectedValues.length > 0 && 'text-gray-900 font-medium'
                        )}>
                            {getDisplayText()}
                        </span>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-1 ml-2">
                        {loading && (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-200 border-t-primary-500" />
                        )}
                        {showClearButton && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className={cn(
                                    "p-1 rounded-md transition-all duration-200",
                                    "hover:bg-gray-100 hover:scale-110 active:scale-95",
                                    "opacity-60 hover:opacity-100"
                                )}
                            >
                                <X className="h-3.5 w-3.5 text-gray-500" />
                            </button>
                        )}
                        <div className={cn(
                            "p-0.5 rounded transition-all duration-300 ease-out",
                            isOpen && "bg-primary-100 rotate-180"
                        )}>
                            <ChevronDown className="h-4 w-4 text-gray-600" />
                        </div>
                    </div>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className={cn(dropdownVariants())}>
                        {/* Search Input */}
                        {searchable && (
                            <div className="p-3 border-b border-gray-100/80 bg-gray-50/30">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search options..."
                                        className={cn(
                                            "w-full pl-10 pr-3 py-2 text-sm",
                                            "bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-lg",
                                            "focus:outline-none focus:border-primary-400 focus:ring-3 focus:ring-primary-200/50",
                                            "transition-all duration-200"
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Options Container */}
                        <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {filteredOptions.length === 0 ? (
                                <div className="px-4 py-6 text-center">
                                    <div className="text-gray-400 text-sm">
                                        {searchTerm ? (
                                            <>
                                                <Search className="h-5 w-5 mx-auto mb-2 opacity-40" />
                                                No options found for &ldquo;{searchTerm}&rdquo;
                                            </>
                                        ) : (
                                            'No options available'
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="py-1">
                                    {filteredOptions.map((option) => {
                                        const isSelected = selectedValues.includes(option.value);
                                        const isDisabled = Boolean(option.disabled || 
                                            (multiple && maxSelections && !isSelected && selectedValues.length >= maxSelections));

                                        let optionState: 'default' | 'selected' | 'disabled' = 'default';
                                        if (isDisabled) optionState = 'disabled';
                                        else if (isSelected) optionState = 'selected';

                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                className={cn(
                                                    optionVariants({ state: optionState }),
                                                    'w-full text-left'
                                                )}
                                                onClick={() => !isDisabled && handleOptionSelect(option.value)}
                                                disabled={isDisabled}
                                            >
                                                <div className="flex items-center flex-1 min-w-0">
                                                    {option.icon && (
                                                        <span className="mr-3 flex-shrink-0">{option.icon}</span>
                                                    )}
                                                    <span className="flex-1 truncate">{option.label}</span>
                                                </div>
                                                
                                                {multiple && isSelected && (
                                                    <div className="ml-2 flex-shrink-0">
                                                        <Check className="h-4 w-4 text-primary-600" />
                                                    </div>
                                                )}
                                                
                                                {!multiple && isSelected && (
                                                    <div className="ml-2 w-2 h-2 rounded-full bg-primary-500"></div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Helper Text */}
                {helperText && (
                    <p className={cn(
                        'mt-2 text-xs font-medium transition-colors duration-200',
                        error ? 'text-red-600' : 'text-gray-500'
                    )}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;