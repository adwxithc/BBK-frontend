'use client';

import { ReactNode } from 'react';
import { X, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'warning' | 'danger' | 'info' | 'success';
    icon?: ReactNode;
}

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning',
    icon
}: ConfirmationModalProps) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    iconColor: 'text-red-600',
                    iconBg: 'bg-red-100',
                    confirmBtn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                    defaultIcon: <XCircle className="h-6 w-6" />
                };
            case 'success':
                return {
                    iconColor: 'text-green-600',
                    iconBg: 'bg-green-100',
                    confirmBtn: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
                    defaultIcon: <CheckCircle className="h-6 w-6" />
                };
            case 'info':
                return {
                    iconColor: 'text-blue-600',
                    iconBg: 'bg-blue-100',
                    confirmBtn: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
                    defaultIcon: <Info className="h-6 w-6" />
                };
            default: // warning
                return {
                    iconColor: 'text-amber-600',
                    iconBg: 'bg-amber-100',
                    confirmBtn: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
                    defaultIcon: <AlertTriangle className="h-6 w-6" />
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div 
                className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-200"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${styles.iconBg}`}>
                            <div className={styles.iconColor}>
                                {icon || styles.defaultIcon}
                            </div>
                        </div>
                        <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${styles.confirmBtn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;