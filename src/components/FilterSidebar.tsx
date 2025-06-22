"use client";
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FilterSidebarProps {
  selectedSizes: string[];
  handleSizeClick: (size: string) => void;
  selectedStyles: string[];
  handleStyleClick: (style: string) => void;
  selectedPrice: number[];
  handlePriceChange: (value: number | number[]) => void;
  showStyleFilter?: boolean;
  isMobile?: boolean;
  onApplyFilter?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedSizes,
  handleSizeClick,
  selectedStyles,
  handleStyleClick,
  selectedPrice,
  handlePriceChange,
  showStyleFilter = true,
  isMobile = false,
  onApplyFilter,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    price: true,
    colors: true,
    size: true,
    style: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-full">
      <div className={`border border-neutral-200 rounded-2xl ${isMobile ? 'p-4' : 'p-3 lg:p-6'}`}>
        <div className={`flex justify-between items-center ${isMobile ? 'mb-4' : 'mb-4 lg:mb-6'}`}>
          <h2 className={`font-bold ${isMobile ? 'text-xl' : 'text-lg lg:text-xl'} text-black`}>Filters</h2>
          <button className="text-neutral-500 hover:text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.62001 8.24998H20.38" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.16 12H17.84" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.68999 15.75H15.31" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Type Filter */}
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('type')}
          >
            <h3 className="font-semibold text-black">T-shirts</h3>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.type ? 'rotate-90' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('type')}
          >
            <h3 className="font-semibold text-black">Shorts</h3>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.type ? 'rotate-90' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('type')}
          >
            <h3 className="font-semibold text-black">Shirts</h3>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.type ? 'rotate-90' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('type')}
          >
            <h3 className="font-semibold text-black">Hoodie</h3>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.type ? 'rotate-90' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('type')}
          >
            <h3 className="font-semibold text-black">Jeans</h3>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.type ? 'rotate-90' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Price */}
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
          <div 
            className={`flex justify-between items-center ${isMobile ? 'mb-4' : 'mb-3 lg:mb-4'} cursor-pointer`}
            onClick={() => toggleSection('price')}
          >
            <h3 className="font-semibold text-black">Price</h3>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          {expandedSections.price && (
            <>
              <Slider
                range
                min={0}
                max={500}
                value={selectedPrice}
                onChange={handlePriceChange}
                trackStyle={[{ backgroundColor: 'black' }]}
                handleStyle={[{ borderColor: 'black', backgroundColor: 'black' }, { borderColor: 'black', backgroundColor: 'black' }]}
                railStyle={{ backgroundColor: '#E5E7EB' }}
              />
              <div className="flex justify-between text-sm text-neutral-500 mt-2">
                <span>${selectedPrice[0]}</span>
                <span>${selectedPrice[1]}</span>
              </div>
            </>
          )}
        </div>
        
        {/* Colors */}
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
          <div 
            className={`flex justify-between items-center ${isMobile ? 'mb-4' : 'mb-3 lg:mb-4'} cursor-pointer`}
            onClick={() => toggleSection('colors')}
          >
            <h3 className="font-semibold text-black">Colors</h3>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.colors ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          {expandedSections.colors && (
            <div className="flex flex-wrap gap-3">
              {[ '#00C12B', '#F50606', '#F5DD06', '#F57906', '#063AF5', '#000000', '#FFFFFF'].map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Size */}
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
          <div 
            className={`flex justify-between items-center ${isMobile ? 'mb-4' : 'mb-3 lg:mb-4'} cursor-pointer`}
            onClick={() => toggleSection('size')}
          >
            <h3 className="font-semibold text-black">Size</h3>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.size ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          {expandedSections.size && (
            <div className="flex flex-wrap gap-2">
              {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ease-in-out ${
                    selectedSizes.includes(size)
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dress Style */}
        {showStyleFilter && (
        <div className={`border-t border-neutral-200 ${isMobile ? 'py-4' : 'py-3 lg:py-6'}`}>
            <div 
              className={`flex justify-between items-center ${isMobile ? 'mb-4' : 'mb-3 lg:mb-4'} cursor-pointer`}
              onClick={() => toggleSection('style')}
            >
              <h3 className="font-semibold text-black">Dress Style</h3>
              <svg 
                className={`w-4 h-4 transition-transform ${expandedSections.style ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            {expandedSections.style && (
              <>
                {["Casual", "Formal", "Party", "Gym"].map((style) => (
                  <div key={style} onClick={() => handleStyleClick(style)} className="flex justify-between items-center py-3 cursor-pointer">
                      <span className={`font-semibold ${selectedStyles.includes(style) ? 'text-black' : 'text-neutral-500'}`}>{style}</span>
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                  </div>
                ))}
              </>
            )}
        </div>
        )}
        
        <button className={`w-full ${isMobile ? 'mt-6' : 'mt-4 lg:mt-6'} py-3 rounded-full bg-black text-white font-bold text-base shadow-lg hover:bg-gray-800 transition-all`} onClick={onApplyFilter}>
          Apply Filter
        </button>
      </div>
    </aside>
  );
}

export default FilterSidebar; 