import React from "react";

const Header = () => (
  <header className="w-full px-6 py-4 flex items-center justify-between border-b bg-white shadow-sm">
    <div className="text-2xl font-bold tracking-tight">LOGO</div>
    <nav className="space-x-8 hidden md:flex">
      <a href="#" className="text-gray-700 hover:text-black font-medium">Home</a>
      <a href="#" className="text-gray-700 hover:text-black font-medium">Shop</a>
      <a href="#" className="text-gray-700 hover:text-black font-medium">About</a>
      <a href="#" className="text-gray-700 hover:text-black font-medium">Contact</a>
    </nav>
    <div className="flex items-center space-x-4">
      <button className="px-4 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition">Sign In</button>
      {/* Cart icon placeholder */}
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">🛒</div>
    </div>
  </header>
);

export default Header; 