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
        const baseClasses = "px-6 py-3 font-black border-2 border-black transition-all duration-300 transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]";

        switch (variant) {
            case 'secondary':
                return `${baseClasses} bg-white text-black hover:bg-gray-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`;
            case 'outline':
                return `${baseClasses} bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]`;
            default:
                return `${baseClasses} bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:from-cyan-500 hover:to-purple-600 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`;
        }
    };

    return (
        <div
            className="relative w-full mx-auto overflow-hidden bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Slideshow container */}
            <div className="relative h-80 md:h-[450px] lg:h-[500px]">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />

                        {/* Label với Neo Brutalism style */}
                        {slide.label && (
                            <div className={`absolute z-5 top-4 left-4 px-4 py-2 rounded-full text-sm font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${slide.labelColor ? slide.labelColor : 'bg-red-400 text-black'}`}>
                                {slide.label}
                            </div>
                        )}

                        {/* Overlay gradient - Neo Brutalism style */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />

                       // Content - Với text shadow và độ tương phản cao
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center max-w-2xl mx-6 space-y-6">
                                {slide.title && (
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white [text-shadow:_2px_2px_0_rgb(0_0_0_/_80%)] drop-shadow-2xl">
                                        {slide.title}
                                    </h2>
                                )}
                                {slide.description && (
                                    <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-black [text-shadow:_3px_3px_0_rgb(0_0_0_/_60%)]">
                                        {slide.description}
                                    </p>
                                )}
                                {slide.actionButton && (
                                    <div className="pt-6">
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
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:bg-gray-100 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        aria-label="Previous image"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:bg-gray-100 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        aria-label="Next image"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Slide indicators */}
            {showIndicators && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white px-3 py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full border-2 border-black transition-all duration-300 ${index === currentIndex
                                ? 'bg-cyan-400 scale-110 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                                : 'bg-white hover:bg-gray-200'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Slide counter */}
            <div className="absolute top-4 right-4 bg-white border-2 border-black rounded-full px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black text-sm md:text-base text-black">
                    {currentIndex + 1}
                </span>
                <span className="mx-1 font-black text-black">/</span>
                <span className="font-black text-gray-600 text-sm md:text-base">
                    {slides.length}
                </span>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-cyan-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-purple-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};

export default CustomSlideShow;