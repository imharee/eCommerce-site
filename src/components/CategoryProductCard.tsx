"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

interface CategoryProductCardProps {
  product: {
    id: string;
    name: string;
    rating: number;
    price: number;
    oldPrice?: number | null;
    discount?: number | null;
    imageUrl: string;
  };
  onAddToCart: () => void;
}

const CategoryProductCard: React.FC<CategoryProductCardProps> = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    onAddToCart();
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col group relative hover:shadow-lg transition-all duration-300">
        <Link href={`/product/${product.id}`} className="block">
            <div className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>
        </Link>
      <div className="flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-base text-black mb-2 leading-tight">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm text-gray-600 ml-1">{product.rating.toFixed(1)}/5.0</span>
        </div>

        <div className="flex items-center gap-2 mt-auto">
            <span className="text-xl font-bold text-black">${product.price}</span>
            {product.oldPrice && (
            <span className="text-base line-through text-gray-400">${product.oldPrice}</span>
            )}
            {product.discount && (
                <span className="text-sm text-red-500 font-bold bg-red-100 px-2 py-0.5 rounded-md">-{product.discount}%</span>
            )}
        </div>
      </div>
       <button
        onClick={handleAddToCart}
        className="mt-4 w-full py-2.5 rounded-lg bg-black text-white font-semibold text-center opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 left-5 transition-all duration-300"
        style={{maxWidth: 'calc(100% - 40px)'}}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CategoryProductCard; 