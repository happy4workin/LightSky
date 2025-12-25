'use client';

import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { GeneratedPortfolio } from '@/lib/ai/mockGenerator';
import PortfolioPreview from './PortfolioPreview';

interface PortfolioCarouselProps {
    portfolios: GeneratedPortfolio[];
    onSelect: (portfolio: GeneratedPortfolio) => void;
}

export default function PortfolioCarousel({ portfolios, onSelect }: PortfolioCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelectCallback = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    // Set up event listeners
    useState(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelectCallback);
        onSelectCallback();
    });

    if (portfolios.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Generated Portfolios</h2>
                <p className="text-gray-600">Browse through AI-generated options and select one</p>
            </div>

            <div className="relative">
                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {portfolios.map((portfolio) => (
                            <div key={portfolio.id} className="flex-[0_0_100%] min-w-0 px-4">
                                <div className="my-8">
                                    <div className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden" style={{ height: '400px' }}>
                                        <PortfolioPreview
                                            name={portfolio.name}
                                            description={portfolio.description}
                                            blocks={portfolio.blocks}
                                            backgroundColor={portfolio.metadata.backgroundColor}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                {portfolios.length > 1 && (
                    <>
                        <button
                            onClick={scrollPrev}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-100 rounded-full shadow-lg flex items-center justify-center transition-colors duration-150"
                        >
                            ←
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-100 rounded-full shadow-lg flex items-center justify-center transition-colors duration-150"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {/* Indicators and Action */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        {portfolios.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === selectedIndex ? 'bg-purple-500' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => onSelect(portfolios[selectedIndex])}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Apply This Portfolio
                    </button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                    {selectedIndex + 1} of {portfolios.length}
                </div>
            </div>
        </div>
    );
}
