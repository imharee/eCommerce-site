'use client';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState } from 'react';

const navLinks = [
  { label: "Casual", href: "/category/casual" },
  { label: "Overview", href: "/category/all" },
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "T-SHIRT", href: "/product/1" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Promo Bar */}
      <div className="w-full bg-black text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
        Sign up and get 20% off for your first order. <a href="#" className="underline ml-1 hover:text-gray-300 transition-colors">Sign Up Now</a>
      </div>
      
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-wider hover:opacity-80 transition text-black font-integral focus-ring">
            SHOP.CO
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="space-x-6 lg:space-x-8 hidden lg:flex">
            {navLinks.map(link => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-gray-700 hover:text-black font-medium transition-colors focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Search Bar */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 sm:px-4 py-2 w-full max-w-xs mx-4">
            <Search className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent text-gray-700 ml-2 w-full outline-none placeholder:text-gray-600 placeholder:font-semibold text-sm"
            />
          </div>
          
          {/* Desktop Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/cart" className="relative focus-ring" aria-label="Go to cart">
              <ShoppingCart className="text-gray-700 hover:text-black w-5 h-5 sm:w-6 sm:h-6 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFD700] text-black text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button aria-label="User Profile" className="focus-ring">
              <User className="text-gray-700 hover:text-black w-5 h-5 sm:w-6 sm:h-6 transition-colors" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden focus-ring p-1"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="text-gray-700 w-6 h-6" />
              ) : (
                <Menu className="text-gray-700 w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200 animate-slide-up">
            <div className="px-4 py-3">
              {/* Mobile Search */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
                <Search className="text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="bg-transparent text-gray-700 ml-2 w-full outline-none placeholder:text-gray-600 placeholder:font-semibold text-sm"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-3">
                {navLinks.map(link => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="block text-gray-700 hover:text-black font-medium py-2 transition-colors focus-ring"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header; 