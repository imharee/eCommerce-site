'use client';
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import CustomerReviews from "../components/CustomerReviews";
import NewsletterSignup from "../components/NewsletterSignup";
import Link from "next/link";
import { productList } from "../data/products";

const brands = [
  { name: "Zara", logo: "/brands/brand1.svg" },
  { name: "Versace", logo: "/brands/brand2.svg" },
  { name: "Gucci", logo: "/brands/brand3.svg" },
  { name: "Prada", logo: "/brands/brand4.svg" },
  { name: "Calvin Klein", logo: "/brands/brand5.svg" },
];

// Use products from the data file instead of hardcoded arrays
const newArrivals = productList.slice(0, 4);
const topSelling = productList.slice(4, 8);

const categories = [
  { name: "Casual", imageUrl: "/images/category-casual.png" },
  { name: "Formal", imageUrl: "/images/category-formal.png" },
  { name: "Party", imageUrl: "/images/category-party.png" },
  { name: "Gym", imageUrl: "/images/category-gym.png" },
];

function HomeContent() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptKey, setPromptKey] = useState(0);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const searchParams = useSearchParams();

  const handleAddToCartSuccess = () => {
    setShowPrompt(true);
    setPromptKey(prev => prev + 1);
  };

  useEffect(() => {
    if (showPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPrompt, promptKey]);

  // Check for purchase success parameter
  useEffect(() => {
    const purchase = searchParams.get('purchase');
    if (purchase === 'success') {
      setShowPurchasePopup(true);
      // Remove the parameter from URL
      window.history.replaceState({}, '', '/');
      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPurchasePopup(false);
      }, 3000);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      {/* Added to Cart Prompt */}
      <div key={promptKey} className={`fixed top-4 sm:top-8 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-500 ${showPrompt ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <div className="bg-black text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full shadow-lg font-bold text-sm sm:text-base lg:text-lg animate-bounce-in-out-mobile sm:animate-bounce-in-out">
          Added to cart
        </div>
      </div>
      
      {/* Purchase Success Popup */}
      <div className={`fixed top-4 sm:top-8 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-500 ${showPurchasePopup ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <div className="bg-green-600 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full shadow-lg font-bold text-sm sm:text-base lg:text-lg animate-bounce-in-out-mobile sm:animate-bounce-in-out">
          You have purchased!
        </div>
      </div>
      
      {/* Hero Section - Enhanced responsive design */}
      <section className="relative w-full bg-[#F2F0F1] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-3 lg:pt-1 pb-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 flex flex-col items-start justify-center z-10 order-1 lg:order-1 w-full lg:w-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black leading-tight mb-4 sm:mb-6 tracking-tight" style={{letterSpacing: '-0.04em'}}>
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg lg:max-w-xl leading-relaxed">
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
              </p>
              <Link 
                href="/category/casual" 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-base sm:text-lg shadow-lg transition-all duration-300 transform hover:scale-105 mb-8 sm:mb-10 w-fit"
              >
                Shop Now
              </Link>
              <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12 mb-8 justify-center lg:justify-start">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">200+</p>
                  <p className="text-gray-500 text-xs sm:text-sm lg:text-base">International Brands</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">2,000+</p>
                  <p className="text-gray-500 text-xs sm:text-sm lg:text-base">High-Quality Products</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">30,000+</p>
                  <p className="text-gray-500 text-xs sm:text-sm lg:text-base">Happy Customers</p>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="flex-1 flex items-center justify-center relative w-full lg:w-auto order-2 lg:order-2">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg">
                <Image 
                  src="/images/hero.jpg" 
                  alt="Hero" 
                  width={300} 
                  height={400} 
                  className="rounded-2xl object-cover w-full h-auto" 
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Brands Section - Enhanced responsive */}
      <section className="w-full bg-black py-6 sm:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-around items-center flex-wrap gap-4 sm:gap-8">
            {brands.map((brand) => (
              <div key={brand.name} className="h-6 sm:h-8 relative w-20 sm:w-28">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* NEW ARRIVALS Section - Enhanced responsive */}
      <main className="flex-1 w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <section id="new-arrivals" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 text-[#262626] tracking-tight uppercase">
              NEW ARRIVALS
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  discount={product.discount}
                  imageUrl={product.imageUrl}
                  onAddToCartSuccess={handleAddToCartSuccess}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/category/all" 
                className="px-8 sm:px-12 py-3 border-2 border-gray-200 rounded-full font-bold hover:bg-gray-100 hover:text-black transition-all duration-300 text-[#262626] text-sm sm:text-base"
              >
                View All
              </Link>
            </div>
          </section>
          <hr className="my-12 sm:my-16 border-[#f0f0f0]" />
          
          {/* TOP SELLING Section - Enhanced responsive */}
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-12 text-[#262626] tracking-tight uppercase">
              TOP SELLING
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {topSelling.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  discount={product.discount}
                  imageUrl={product.imageUrl}
                  onAddToCartSuccess={handleAddToCartSuccess}
                />
              ))}
            </div>
            <div className="text-center mt-8 sm:mt-12">
              <Link 
                href="/category/all" 
                className="px-8 sm:px-12 py-3 border-2 border-gray-200 rounded-full font-bold hover:bg-gray-100 hover:text-black transition-all duration-300 text-[#262626] text-sm sm:text-base"
              >
                View All
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      {/* Browse by Dress Style Section - Enhanced responsive */}
      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#F0F0F0] rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] p-6 sm:p-8 md:p-12 flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 text-[#262626] tracking-tight uppercase">
                Browse by Dress Style
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
                {categories.map((category, index) => (
                  <div key={category.name} className={`relative ${index < 2 ? "h-64 sm:h-80" : "h-56 sm:h-64"}`}>
                    <CategoryCard 
                      name={category.name} 
                      imageUrl={category.imageUrl}
                      textAlign={index < 2 ? 'right' : 'left'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Customer Reviews Section */}
      <CustomerReviews />
      
      {/* Newsletter Section */}
      <NewsletterSignup />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
} 