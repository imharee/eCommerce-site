'use client';
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  textAlign?: 'left' | 'right';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, imageUrl, textAlign = 'left' }) => {
  return (
    <Link href={`/category/${name.toLowerCase()}`} className="block group w-full h-full">
      <div className="relative rounded-2xl overflow-hidden w-full h-full group cursor-pointer shadow-lg">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <h3 
          className={`absolute text-black font-extrabold text-3xl md:text-4xl tracking-wide uppercase ${
            textAlign === 'right' ? 'top-6 right-6 text-right' : 'top-6 left-6 text-left'
          }`}
        >
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard; 