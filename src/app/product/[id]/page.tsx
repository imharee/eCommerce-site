'use client';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import Image from 'next/image';
import { useState } from 'react';
import { Star, Check } from 'lucide-react';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { productList, reviews as allReviews, recommendations } from '../../../data/products';
import NewsletterSignup from '../../../components/NewsletterSignup';
import Footer from '../../../components/Footer';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const product = productList.find(p => p.id === params.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('reviews');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.value);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[2]);
  const [visibleReviews, setVisibleReviews] = useState(6);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }
  
  const reviews = allReviews.slice(0, visibleReviews);

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/category/all" className="hover:text-black">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-semibold">{product.type}</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3">
              {(product.imageUrls || []).map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-neutral-100 rounded-xl overflow-hidden w-24 h-24 p-2 transition-all duration-300 relative ${selectedImage === idx ? 'ring-2 ring-black' : ''}`}
                >
                  <Image src={url} alt={`Thumbnail ${idx + 1}`} layout="fill" className="object-contain"/>
                </button>
              ))}
            </div>
            <div className="flex-grow">
              <div className="bg-neutral-100 rounded-2xl p-4 flex items-center justify-center h-full">
                <Image
                  src={(product.imageUrls || [product.imageUrl])[selectedImage]}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain w-full h-auto max-h-[500px]"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">{product.name.toUpperCase()}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={` ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`} />
                ))}
              </div>
              <span className="text-sm text-neutral-600">{product.rating.toFixed(1)}/5</span>
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-black">${product.price}</span>
              {product.oldPrice && <span className="text-2xl line-through text-neutral-400">${product.oldPrice}</span>}
              {product.discount && <span className="px-2 py-0.5 bg-red-100 text-red-500 rounded-md text-sm font-bold">-{product.discount}%</span>}
            </div>
            <p className="text-neutral-700 mb-6">{product.description}</p>
            
            <hr className="my-6 border-neutral-200" />
            
            <div>
              <p className="text-neutral-600 mb-3">Select Colors</p>
              <div className="flex gap-3">
                {product.colors?.map(color => (
                  <button key={color.name} onClick={() => setSelectedColor(color.value)} className={`w-9 h-9 rounded-full relative transition-all duration-200`} style={{backgroundColor: color.value}}>
                    {selectedColor === color.value && <div className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-black"></div>}
                  </button>
                ))}
              </div>
            </div>
            
            <hr className="my-6 border-neutral-200" />

            <div>
              <p className="text-neutral-600 mb-3">Choose Size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${selectedSize === size ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <hr className="my-6 border-neutral-200" />

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-neutral-100 rounded-full">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 py-3 text-xl hover:bg-neutral-200 rounded-l-full">-</button>
                <span className="px-4 py-3 font-semibold w-16 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-5 py-3 text-xl hover:bg-neutral-200 rounded-r-full">+</button>
              </div>
              <button
                onClick={() => dispatch(addToCart({ ...product, quantity, color: selectedColor, size: selectedSize }))}
                className="flex-grow bg-black text-white rounded-full py-4 text-base font-semibold hover:bg-neutral-800 transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-neutral-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <button onClick={() => setSelectedTab('details')} className={`py-4 px-1 border-b-2 font-semibold ${selectedTab === 'details' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}>Product Details</button>
              <button onClick={() => setSelectedTab('reviews')} className={`py-4 px-1 border-b-2 font-semibold ${selectedTab === 'reviews' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}>Rating & Reviews</button>
              <button onClick={() => setSelectedTab('faqs')} className={`py-4 px-1 border-b-2 font-semibold ${selectedTab === 'faqs' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}`}>FAQs</button>
            </nav>
          </div>

          <div className="py-10">
            {selectedTab === 'details' && (
              <div className="text-neutral-700 space-y-2 max-w-2xl">
                {product.details?.map((detail, index) => <p key={index}>{detail}</p>)}
              </div>
            )}
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">All Reviews <span className="text-neutral-500 text-lg font-normal">({allReviews.length})</span></h3>
                  <div className="flex gap-2">
                    <button className="bg-neutral-100 rounded-full p-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M3 12h18M3 17h18" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                    <select className="bg-neutral-100 rounded-full px-4 py-3 font-semibold appearance-none">
                      <option>Latest</option>
                    </select>
                    <button className="bg-black text-white rounded-full px-6 py-3 font-semibold">Write a Review</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {reviews.map((review, i) => (
                    <div key={i} className="border border-neutral-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => <Star key={i} size={20} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'} />)}
                        </div>
                        <button className="text-neutral-400">...</button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-bold">{review.name}</p>
                        <Check size={16} className="bg-green-500 text-white rounded-full p-0.5" />
                      </div>
                      <p className="text-neutral-700 mb-3">'"{review.text}"'</p>
                      <p className="text-sm text-neutral-500">Posted on {review.date}</p>
                    </div>
                  ))}
                </div>
                {visibleReviews < allReviews.length && (
                  <div className="text-center mt-10">
                    <button onClick={() => setVisibleReviews(v => v + 6)} className="border border-neutral-300 rounded-full px-8 py-3 font-semibold hover:bg-neutral-100 transition-colors">Load More Reviews</button>
                  </div>
                )}
              </div>
            )}
            {selectedTab === 'faqs' && (
              <div className="space-y-6 max-w-2xl">
                {product.faqs?.map((faq, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-lg mb-1">{faq.q}</h4>
                    <p className="text-neutral-700">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* You Might Also Like */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-10">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendations.map((item) => {
              const p = productList.find(prod => prod.id === item.id);
              if (!p) return null;
              return (
                <Link href={`/product/${item.id}`} key={item.id} className="text-left group">
                  <div className="bg-neutral-100 rounded-2xl p-4 mb-4 overflow-hidden">
                    <Image src={item.imageUrl} alt={item.name} width={300} height={300} className="w-full h-auto group-hover:scale-105 transition-transform duration-300"/>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl">${item.price}</span>
                    {p.oldPrice && <span className="text-neutral-400 line-through">${p.oldPrice}</span>}
                  </div>
                   {p.discount && <span className="text-sm text-red-500 font-bold">-{p.discount}%</span>}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
      <NewsletterSignup />
      <Footer />
    </div>
  );
}