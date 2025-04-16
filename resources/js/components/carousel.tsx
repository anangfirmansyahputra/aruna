"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType } from 'embla-carousel';

export interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

export interface AutoplayOptions {
  delay?: number;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
  rootNode?: (emblaRoot: HTMLElement) => HTMLElement | null;
}

export interface CarouselProps {
  items: CarouselItem[];
  options?: EmblaOptionsType;
  autoplay?: boolean | AutoplayOptions;
  showNavigation?: boolean;
  showPagination?: boolean;
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
  navigationClassName?: {
    parent?: string;
    button?: string;
    active?: string;
  };
  paginationClassName?: {
    parent?: string;
    button?: string;
    active?: string;
  };
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  options = {
    loop: true,
    align: 'start',
  },
  autoplay = false,
  showNavigation = false,
  showPagination = false,
  className = '',
  containerClassName = '',
  itemClassName = '',
  navigationClassName = {},
  paginationClassName = {},
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const autoplayOptions = {
    delay: 5000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    ...(typeof autoplay === 'object' ? autoplay : {}),
  };

  const plugins = autoplay ? [Autoplay(autoplayOptions)] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const canScrollPrev = useCallback(() => emblaApi && emblaApi.canScrollPrev(), [emblaApi]);
  const canScrollNext = useCallback(() => emblaApi && emblaApi.canScrollNext(), [emblaApi]);

  return (
    <div className={`relative w-full h-full select-none m-auto ${className}`}>
      <div className="relative w-full h-full overflow-hidden" ref={emblaRef}>
        <div
          className={`flex w-full h-full touch-pan-y touch-pinch-zoom ${containerClassName}`}
          style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0px, 0px, 0px)' }}
        >
          {items.map((item) => (
            <div key={item.id} className={`grow-0 shrink-0 min-w-0 ${itemClassName}`}>
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {showNavigation && items.length > 1 && (
        <div className={`absolute z-30 w-full top-1/2 -translate-y-1/2 flex justify-between ${navigationClassName.parent}`}>
          <button
            onClick={scrollPrev}
            disabled={!options.loop && !canScrollPrev()}
            className={`z-30 left-4 bg-black/30 text-white p-2 rounded-full disabled:opacity-50 hover:bg-black/70 ${navigationClassName.button}`}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            disabled={!options.loop && !canScrollNext()}
            className={`z-30 right-4 bg-black/30 text-white p-2 rounded-full disabled:opacity-50 hover:bg-black/70 ${navigationClassName.button}`}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {showPagination && scrollSnaps.length > 1 && (
        <div className={`z-30 absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 ${paginationClassName.parent}`}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                index === selectedIndex
                  ? `bg-primary w-3 h-3 ${paginationClassName.active}`
                  : 'bg-white hover:bg-white/70 w-3 h-3'
              } ${paginationClassName.button}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Carousel.displayName = 'Carousel';

export default Carousel;
