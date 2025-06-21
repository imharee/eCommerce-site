import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-16 pb-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and social links */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold tracking-wider mb-4">SHOP.CO</h3>
            <p className="text-gray-600 mb-6 max-w-xs">We have clothes that empower your style. From formal to casual, we have it all.</p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white hover:bg-gray-200 transition"><Twitter size={20} /></a>
              <a href="#" className="p-2 rounded-full bg-white hover:bg-gray-200 transition"><Facebook size={20} /></a>
              <a href="#" className="p-2 rounded-full bg-white hover:bg-gray-200 transition"><Instagram size={20} /></a>
              <a href="#" className="p-2 rounded-full bg-white hover:bg-gray-200 transition"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-bold mb-4">COMPANY</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">About</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Features</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Works</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Career</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">HELP</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Customer Support</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Delivery Details</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">RESOURCES</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Free eBooks</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Development Tutorial</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">How to - Blog</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />
        <div className="text-center text-gray-500">
          <p>© 2024 Shop.co, All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 