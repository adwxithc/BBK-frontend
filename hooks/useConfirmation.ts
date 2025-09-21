import { useState } from 'react';

interface UseConfirmationOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'warning' | 'danger' | 'info' | 'success';
}

export const useConfirmation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<UseConfirmationOptions>({
        title: '',
        message: ''
    });
    const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

    const showConfirmation = (opts: UseConfirmationOptions, onConfirm: () => void) => {
        setOptions(opts);
        setOnConfirmCallback(() => onConfirm);
        setIsOpen(true);
    };

    const hideConfirmation = () => {
        setIsOpen(false);
        setOnConfirmCallback(null);
    };

    const handleConfirm = () => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        hideConfirmation();
    };

    return {
        isOpen,
        options,
        showConfirmation,
        hideConfirmation,
        handleConfirm
    };
};