'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import CustomerReviews from "../components/CustomerReviews";
import NewsletterSignup from "../components/NewsletterSignup";
import Link from "next/link";

const brands = [
  { name: "Zara", logo: "/brands/brand1.svg" },
  { name: "Versace", logo: "/brands/brand2.svg" },
  { name: "Gucci", logo: "/brands/brand3.svg" },
  { name: "Prada", logo: "/brands/brand4.svg" },
  { name: "Calvin Klein", logo: "/brands/brand5.svg" },
];

const newArrivals = [
  { id: '1', name: "T-shirt with Tape Details", rating: 4.5, price: 120, imageUrl: "/images/new-arrival-1.png" },
  { id: '2', name: "Skinny Fit Jeans", rating: 3.5, price: 240, oldPrice: 260, discount: 20, imageUrl: "/images/new-arrival-2.png" },
  { id: '3', name: "Checkered Shirt", rating: 4.5, price: 180, imageUrl: "/images/new-arrival-3.png" },
  { id: '4', name: "Sleeve Striped T-shirt", rating: 4.5, price: 130, oldPrice: 160, discount: 30, imageUrl: "/images/new-arrival-4.png" },
];

const topSelling = [
  { id: '5', name: "Vertical Striped Shirt", rating: 5, price: 212, oldPrice: 232, discount: 20, imageUrl: "/images/top-selling-1.png" },
  { id: '6', name: "Courage Graphic T-shirt", rating: 4.0, price: 145, imageUrl: "/images/top-selling-2.png" },
  { id: '7', name: "Loose Fit Bermuda Shorts", rating: 3.0, price: 80, imageUrl: "/images/top-selling-3.png" },
  { id: '8', name: "Faded Skinny Jeans", rating: 4.5, price: 210, imageUrl: "/images/top-selling-4.png" },
];

const categories = [
  { name: "Casual", imageUrl: "/images/category-casual.png" },
  { name: "Formal", imageUrl: "/images/category-formal.png" },
  { name: "Party", imageUrl: "/images/category-party.png" },
  { name: "Gym", imageUrl: "/images/category-gym.png" },
];

export default function Home() {
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
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Added to Cart Prompt */}
      <div key={promptKey} className={`fixed top-8 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-500 ${showPrompt ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <div className="bg-black text-white px-8 py-4 rounded-full shadow-lg font-extrabold text-lg animate-bounce-in-out">
          Added to cart
        </div>
      </div>
      
      {/* Purchase Success Popup */}
      <div className={`fixed top-8 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-500 ${showPurchasePopup ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <div className="bg-green-600 text-white px-8 py-4 rounded-full shadow-lg font-extrabold text-lg animate-bounce-in-out">
          You have purchased!
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative w-full bg-white flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pb-0 md:pt-20">
        <div className="flex-1 flex flex-col items-start justify-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-6 tracking-tight" style={{letterSpacing: '-0.04em'}}>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <Link href="/category/casual" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow transition mb-10">Shop Now</Link>
          <div className="flex gap-8 mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-black">200+</p>
              <p className="text-gray-500 text-sm">International Brands</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-black">2,000+</p>
              <p className="text-gray-500 text-sm">High-Quality Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-black">30,000+</p>
              <p className="text-gray-500 text-sm">Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative w-full md:w-auto mt-8 md:mt-0">
          <Image src="/images/hero.jpg" alt="Hero" width={480} height={520} className="rounded-2xl object-cover shadow-xl" />
        </div>
      </section>
      
      {/* Brands Section */}
      <section className="w-full bg-black py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center flex-wrap gap-8">
            {brands.map((brand) => (
              <div key={brand.name} className="h-8 relative w-28">
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
      
      {/* NEW ARRIVALS Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <section id="new-arrivals" className="scroll-mt-20">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-[#262626] tracking-tight uppercase">NEW ARRIVALS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <Link href="/category/all" className="px-12 py-3 border-2 border-gray-200 rounded-full font-bold hover:bg-gray-100 hover:text-black transition text-[#262626]">
              View All
            </Link>
          </div>
        </section>
        <hr className="my-16 border-[#f0f0f0]" />
        
        {/* TOP SELLING Section */}
        <section>
          <h2 className="text-4xl font-extrabold text-center mb-12 text-[#262626] tracking-tight uppercase">TOP SELLING</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <div className="text-center mt-12">
            <Link href="/category/all" className="px-12 py-3 border-2 border-gray-200 rounded-full font-bold hover:bg-gray-100 hover:text-black transition text-[#262626]">
              View All
            </Link>
          </div>
        </section>
      </main>
      
      {/* Browse by Dress Style Section */}
      <section className="w-full py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F0F0F0] rounded-[40px] p-6 md:p-12 flex flex-col items-center">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-[#262626] tracking-tight uppercase">Browse by Dress Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {categories.map((category, index) => (
                <div key={category.name} className={index < 2 ? "h-80" : "h-64"}>
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
      </section>
      
      <CustomerReviews />
      <NewsletterSignup />
      <Footer />
    </div>
  );
} 