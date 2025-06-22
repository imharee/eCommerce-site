'use client';
import React from "react";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

interface ProductCardProps {
  id: string;
  name: string;
  rating: number;
  price: number;
  imageUrl: string;
  oldPrice?: number | null;
  discount?: number | null;
  onAddToCartSuccess?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, rating, price, imageUrl, oldPrice, discount, onAddToCartSuccess }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    dispatch(addToCart({ id, name, price, imageUrl, quantity: 1 }));
    if (onAddToCartSuccess) {
      onAddToCartSuccess();
    }
  };

  return (
    <Link href={`/product/${id}`} className="block group focus-ring">
      <div className="bg-[#F0F0F0] rounded-xl overflow-hidden relative hover-lift">
        <div className="relative w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center bg-transparent p-4">
          <Image 
            src={imageUrl} 
            alt={name || 'Product image'} 
            fill 
            className="object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          {discount && (
            <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-scale-in z-10">
              -{discount}%
            </span>
          )}
           <button
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
            className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black text-white rounded-full p-2 sm:p-3 shadow-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800 focus-ring z-10"
          >
            <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-4 bg-white">
          <h3 className="font-semibold text-sm sm:text-base text-black mb-1 truncate leading-tight">{name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} sm:w-3.5 sm:h-3.5`}
              />
            ))}
            <span className="font-medium text-xs text-gray-700 ml-1">{rating.toFixed(1)}/5</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-bold text-lg sm:text-xl text-black">${price.toFixed(2)}</span>
            {oldPrice && (
              <span className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
    </Link>
  );
};

export default ProductCard; 