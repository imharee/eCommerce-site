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
  oldPrice?: number;
  discount?: number;
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
    <Link href={`/product/${id}`} className="block group">
      <div className="bg-[#F0F0F0] rounded-xl overflow-hidden relative">
        <div className="relative w-full h-64 flex items-center justify-center bg-transparent p-4">
          <Image src={imageUrl} alt={name || 'Product image'} fill className="object-contain" />
          {discount && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{discount}%</span>
          )}
           <button
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
            className="absolute bottom-4 right-4 bg-black text-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
      <div className="p-4 bg-white">
          <h3 className="font-semibold text-base text-black mb-1 truncate">{name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="font-medium text-xs text-gray-700 ml-1">{rating.toFixed(1)}/5</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-bold text-xl text-black">${price.toFixed(2)}</span>
            {oldPrice && (
              <span className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
    </Link>
  );
};

export default ProductCard; 