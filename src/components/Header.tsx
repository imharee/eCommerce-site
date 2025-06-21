'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const navLinks = [
  { label: "Casual", href: "/category/casual" },
  { label: "Overview", href: "/category/" },
  { label: "New Arrivals", href: "/category/new" },
  { label: "Brands", href: "/category/brands" },
];

const Header = () => {
  const cartItemCount = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="w-full px-4 sm:px-8 md:px-16 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wider hover:opacity-80 transition text-black">SHOP.CO</Link>
        <nav className="space-x-8 hidden lg:flex">
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} className="text-gray-700 hover:text-black font-medium">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xs">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent ml-2 w-full outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative" aria-label="Go to cart">
            <ShoppingCart className="text-gray-700 hover:text-black" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FFD700] text-black text-xs font-bold rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button aria-label="User Profile">
            <User className="text-gray-700 hover:text-black" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 