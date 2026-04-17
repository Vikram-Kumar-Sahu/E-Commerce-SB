// HeroSlider.jsx - Using more reliable image URLs
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale!",
    subtitle: "Up to 50% Off on Selected Items",
    description: "Shop the latest collection with amazing discounts",
    buttonText: "Shop Now",
    buttonLink: "/category/sale",
    image: "https://picsum.photos/id/20/1200/400",  // Reliable placeholder image
    color: "from-orange-500 to-red-600",
    badge: "Limited Time Offer",
  },
  {
    id: 2,
    title: "Electronics Mega Sale!",
    subtitle: "Up to 40% Off on Latest Gadgets",
    description: "Smartphones, Laptops, and Accessories at unbeatable prices",
    buttonText: "Shop Electronics",
    buttonLink: "/category/electronics",
    image: "https://picsum.photos/id/0/1200/400",   // Reliable placeholder image
    color: "from-orange-500 to-red-600",
    badge: "Limited Time Offer",
  },
  {
    id: 3,
    title: "Fashion Week Deal!",
    subtitle: "Up to 60% Off on Premium Brands",
    description: "Latest trends for men, women, and kids - Shop now!",
    buttonText: "Explore Fashion",
    buttonLink: "/category/fashion",
    image: "https://picsum.photos/id/30/1200/400",  // Reliable placeholder image
    color: "from-orange-500 to-red-600",
    badge: "Limited Time Offer",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-shrink-0 w-full h-full"
              style={{ width: '100%' }}
            >
              {/* Background with Gradient Overlay - No external images needed */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}>
                {/* Decorative circles for visual appeal */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              </div>
              
              {/* Content */}
              <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-3xl text-center text-white">
                  {/* Animated Badge */}
                  <div className="animate-bounce mb-4">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      🔥 {slide.badge} 🔥
                    </span>
                  </div>
                  
                  {/* Title with animation */}
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h2>
                  
                  {/* Subtitle */}
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3">
                    {slide.subtitle}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base md:text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  
                  {/* CTA Button */}
                  <a
                    href={slide.buttonLink}
                    className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    {slide.buttonText}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-200 rounded-full ${
              currentSlide === index
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Pause/Play */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-20"
      >
        {isAutoPlaying ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm z-20">
        {currentSlide + 1} / {slides.length}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}