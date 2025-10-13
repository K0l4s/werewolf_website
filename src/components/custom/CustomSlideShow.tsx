// ImageSlideshow.tsx
import React, { useState, useEffect } from 'react';

interface Slide {
    image: string;
    title?: string;
    description?: string;
    actionButton?: {
        text: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary' | 'outline';
    };
    label?: string;
    labelColor?: string;
}

interface ImageSlideshowProps {
    slides: Slide[];
    autoPlay?: boolean;
    interval?: number;
    showIndicators?: boolean;
    showNavigation?: boolean;
}

const CustomSlideShow: React.FC<ImageSlideshowProps> = ({
    slides,
    autoPlay = true,
    interval = 5000,
    showIndicators = true,
    showNavigation = true
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Tự động chuyển ảnh
    useEffect(() => {
        if (!autoPlay || isHovered) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, slides.length, isHovered]);

    // Chuyển đến ảnh trước
    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    };

    // Chuyển đến ảnh tiếp theo
    const goToNext = () => {
        setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    };

    // Chuyển đến ảnh cụ thể
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const getButtonClass = (variant: string = 'primary') => {
        const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 opacity-90 hover:opacity-100";

        switch (variant) {
            case 'secondary':
                return `${baseClasses} bg-gray-800 text-white hover:bg-gray-700`;
            case 'outline':
                return `${baseClasses} border-2 border-white text-white bg-transparent hover:bg-white/10`;
            default:
                return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700`;
        }
    };

    return (
        <div
            className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-2xl group mb-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Slideshow container */}
            <div className="relative h-96 md:h-[600px] lg:h-[450px]">
                {/* label */}
                
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {slide.label && (
                            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${slide.labelColor ? slide.labelColor : 'bg-red-600 text-white'}`}>
                                {slide.label}
                            </div>
                        )}
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white transform transition-transform duration-500">
                            <div className="max-w-2xl space-y-4">
                                {slide.title && (
                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                                        {slide.title}
                                    </h2>
                                )}
                                {slide.description && (
                                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                        {slide.description}
                                    </p>
                                )}
                                {slide.actionButton && (
                                    <div className="pt-4">
                                        <button
                                            onClick={slide.actionButton.onClick}
                                            className={getButtonClass(slide.actionButton.variant)}
                                        >
                                            {slide.actionButton.text}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            {showNavigation && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-40 hover:opacity-100 group-hover:translate-x-0 -translate-x-2"
                        aria-label="Previous image"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-40 hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                        aria-label="Next image"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Slide indicators */}
            {showIndicators && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white opacity-100 scale-125'
                                    : 'bg-white/60 opacity-80 hover:opacity-100 hover:scale-110'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Slide counter */}
            <div className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm opacity-80 hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                {currentIndex + 1} / {slides.length}
            </div>
        </div>
    );
};

export default CustomSlideShow;