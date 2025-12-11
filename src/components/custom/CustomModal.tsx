import React, { useEffect, useState } from 'react';

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
    animation?: 'fade' | 'slide' | 'zoom' | 'none';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
    className?: string;
    style?: React.CSSProperties;
    onOpen?: () => void;
    closeOnOutsideClick?: boolean;
    closeOnEsc?: boolean;
    bottomComponent?: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({
    title,
    children,
    onClose,
    isOpen,
    animation = 'fade',
    size = 'md',
    className = '',
    style,
    onOpen,
    closeOnOutsideClick = true,
    closeOnEsc = true,
    bottomComponent,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
            setTimeout(() => setIsAnimating(true), 10);
            onOpen?.();
        } else {
            setIsAnimating(false);
            setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'unset';
            }, 300);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (closeOnEsc && e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeOnEsc, isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (closeOnOutsideClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    const sizeClasses = {
        sm: 'max-w-md w-11/12',
        md: 'max-w-lg w-11/12',
        lg: 'max-w-2xl w-11/12',
        xl: 'max-w-4xl w-11/12',
        full: 'w-full h-full m-0 rounded-none', // UPDATE: Full screen cần h-full
        auto: 'w-auto',
    };

    const animationClasses = {
        fade: `transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`,
        slide: `transform transition-transform duration-300 ${isAnimating ? 'translate-y-0' : 'translate-y-full'}`,
        zoom: `transform transition-transform duration-300 ${isAnimating ? 'scale-100' : 'scale-95'}`,
        none: '',
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm
        ${animationClasses.fade} ${className}`}
            onClick={handleBackdropClick}
            style={style}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* UPDATE: 
               1. Thêm 'flex flex-col': Để chia layout Header-Body-Footer
               2. Thêm 'max-h-[90vh]': Giới hạn chiều cao modal (trừ trường hợp full)
            */}
            <div
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl 
                flex flex-col max-h-[90vh] 
                ${sizeClasses[size]} 
                ${animationClasses[animation]} overflow-hidden`}
                role="document"
            >
                {/* HEADER: Flex-none để không bị co lại */}
                <div className="flex-none flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                    </h3>
                    <button
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <svg className="w-7 h-7 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* BODY: 
                    1. 'flex-1': Chiếm toàn bộ không gian còn lại
                    2. 'overflow-y-auto': Chỉ cuộn nội dung bên trong vùng này
                    3. Bỏ 'max-h-...' cũ đi
                */}
                <div className="flex-1 overflow-y-auto px-6 py-4 text-gray-700 dark:text-gray-300">
                    {children}
                </div>

                {/* FOOTER: Flex-none để luôn nằm dưới cùng */}
                {bottomComponent && (
                    <div className="flex-none px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        {bottomComponent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomModal;