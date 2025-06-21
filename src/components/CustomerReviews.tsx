'use client';

import { useRef } from 'react';
import { Star, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { reviews } from '../data/products';

const CustomerReviews = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.8; // Scroll by 80% of the container width
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-extrabold text-[#262626] tracking-tight uppercase">
            Our Happy Customers
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {reviews.map((review, idx) => (
            <div key={idx} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-start">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-start h-full">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-bold text-lg text-[#262626]">{review.name}</h3>
                  <CheckCircle size={18} className="text-green-500" />
                </div>
                <p className="text-gray-600 text-base">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews; 