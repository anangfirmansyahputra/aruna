import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
  slides: ReactNode[];
  autoLoop?: boolean;
  delay?: number;
  className?: string;
  navPosition?: 'outside' | 'inside';
  navClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoLoop = true,
  delay = 5000,
  className = "",
  navPosition = 'outside',
  navClassName = "",
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoLoop) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, delay);

    return () => clearInterval(timer);
  }, [slides.length, autoLoop, delay]);

  const NavigationDots = () => (
    <div className={`flex justify-center gap-2 ${navClassName}`}>
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrent(index)}
          className={`w-3 h-3 rounded-full hover:bg-gray-400 cursor-pointer ${index === current ? 'bg-primary' : 'bg-gray-200'
            } relative z-30`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className={`${className}`}>
      <div className="relative w-full h-full mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {slides[current]}
          </motion.div>
        </AnimatePresence>

        {navPosition === 'inside' && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
            <div className="pointer-events-auto inline-block">
              <NavigationDots />
            </div>
          </div>
        )}
      </div>

      {navPosition === 'outside' && (
        <div className="mt-4">
          <NavigationDots />
        </div>
      )}
    </div>
  );
};

export default Carousel;