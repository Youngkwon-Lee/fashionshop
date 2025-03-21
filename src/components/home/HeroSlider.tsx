"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    title: 'Soft color round cardigan',
    price: '39,000',
    link: '/product/soft-color-round-cardigan/1801/category/24/display/1',
    colorOptions: 6
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    title: 'Weekly Best',
    link: '/product/list.html?cate_no=24',
    sale: true,
    originalPrice: '49,000',
    price: '32,000'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    title: 'Best styling',
    link: '/product/list.html?cate_no=24',
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 bg-white/90 p-4 md:p-6 max-w-[280px]">
              <h2 className="text-lg md:text-xl font-medium mb-2">{slide.title}</h2>
              <div className="flex items-baseline gap-2">
                {slide.sale && (
                  <span className="text-gray-500 line-through text-sm">{slide.originalPrice}</span>
                )}
                {slide.price && (
                  <span className="font-semibold">{slide.price}</span>
                )}
                {slide.colorOptions && (
                  <span className="text-sm text-gray-600">/ {slide.colorOptions}color</span>
                )}
              </div>
              <Link
                href={slide.link}
                className="inline-block mt-3 px-4 py-2 border border-black text-xs hover:bg-black hover:text-white transition-colors"
              >
                VIEW MORE
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-black' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
