'use client';
import { Check, Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../../components/Footer';
import NewsletterSignup from '../../../components/NewsletterSignup';
import { reviews as allReviews, productList, recommendations } from '../../../data/products';
import { addToCart } from '../../../store/cartSlice';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const product = productList.find(p => p.id === params.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('reviews');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.value || '#000000');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Medium');
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }
  
  const reviews = allReviews.slice(0, visibleReviews);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size before adding to cart');
      return;
    }
    
    dispatch(addToCart({ 
      ...product, 
      quantity, 
      color: selectedColor, 
      size: selectedSize 
    }));
    
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const isButtonDisabled = !selectedColor || !selectedSize;
  const selectedColorName = product.colors?.find(c => c.value === selectedColor)?.name || 'Color';
  const selectedSizeText = selectedSize || 'Size';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/category/all" className="hover:text-black transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-semibold">{product.type}</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3">
              {(product.imageUrls || [product.imageUrl]).map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-gray-100 rounded-xl overflow-hidden w-20 h-20 p-2 transition-all duration-300 relative ${selectedImage === idx ? 'ring-2 ring-black shadow-lg' : 'hover:ring-1 hover:ring-gray-300'}`}
                >
                  <Image 
                    src={url} 
                    alt={`${product.name} thumbnail ${idx + 1}`} 
                    fill 
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
            <div className="flex-grow">
              <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center h-[500px]">
                <Image
                  src={(product.imageUrls || [product.imageUrl])[selectedImage]}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain w-full h-auto max-h-full"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-black mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">{product.rating.toFixed(1)}/5.0</span>
                <span className="text-sm text-gray-500">({allReviews.length} reviews)</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-black">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xl line-through text-gray-400">${product.oldPrice}</span>
              )}
              {product.discount && (
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            
            {/* Product Highlights */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Product Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Premium quality fabric</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Comfortable fit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Breathable material</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Easy to care for</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            {product.details && product.details.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Care Instructions</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  {product.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 font-semibold">Color</p>
                  <span className="text-sm text-gray-500">
                    {selectedColorName}
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color.name} 
                      onClick={() => setSelectedColor(color.value)} 
                      className={`w-12 h-12 rounded-full relative transition-all duration-200 border-2 ${
                        selectedColor === color.value 
                          ? 'border-black shadow-lg' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`} 
                      style={{backgroundColor: color.value}}
                      title={color.name}
                    >
                      {selectedColor === color.value && (
                        <div className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-black"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <hr className="border-gray-200" />

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 font-semibold">Size</p>
                  <span className="text-sm text-gray-500">
                    {selectedSizeText}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)} 
                      className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 border-2 ${
                        selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-gray-200" />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-2xl font-bold text-black hover:bg-gray-200 rounded-l-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-bold text-2xl text-black w-16 text-center bg-white border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-3 text-2xl font-bold text-black hover:bg-gray-200 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {quantity} item{quantity > 1 ? 's' : ''} selected
                </span>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className="w-full bg-black text-white rounded-lg py-4 text-lg font-semibold hover:bg-gray-800 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              
              {isButtonDisabled && (
                <p className="text-sm text-red-600 text-center">
                  Please select both color and size
                </p>
              )}

              {/* Success Notification */}
              {showAddedToCart && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-in slide-in-from-right duration-300">
                  <Check size={20} className="text-white" />
                  <div>
                    <p className="font-semibold">Added to Cart!</p>
                    <p className="text-sm opacity-90">{product.name} - {selectedColorName}, {selectedSizeText}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-8" aria-label="Tabs">
              <button 
                onClick={() => setSelectedTab('details')} 
                className={`py-4 px-1 border-b-2 font-semibold transition-colors ${
                  selectedTab === 'details' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Product Details
              </button>
              <button 
                onClick={() => setSelectedTab('reviews')} 
                className={`py-4 px-1 border-b-2 font-semibold transition-colors ${
                  selectedTab === 'reviews' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rating & Reviews
              </button>
              <button 
                onClick={() => setSelectedTab('faqs')} 
                className={`py-4 px-1 border-b-2 font-semibold transition-colors ${
                  selectedTab === 'faqs' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                FAQs
              </button>
            </nav>
          </div>

          <div className="py-10">
            {selectedTab === 'details' && (
              <div className="text-gray-700 space-y-4 max-w-3xl">
                {product.details?.map((detail, index) => (
                  <p key={index} className="leading-relaxed">{detail}</p>
                ))}
              </div>
            )}
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-black">
                    All Reviews 
                    <span className="text-gray-500 text-lg font-normal ml-2">({allReviews.length})</span>
                  </h3>
                  <div className="flex gap-3">
                    <button className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-colors text-black">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <select className="bg-gray-100 rounded-lg px-4 py-3 font-semibold appearance-none border-0 focus:outline-none focus:ring-2 focus:ring-black text-black">
                      <option>Latest</option>
                      <option>Highest Rated</option>
                      <option>Lowest Rated</option>
                    </select>
                    <button className="bg-black text-white rounded-lg px-6 py-3 font-semibold hover:bg-gray-800 transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">•••</button>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <p className="font-bold text-black text-base">{review.name}</p>
                        <Check size={16} className="bg-green-500 text-white rounded-full p-0.5" />
                      </div>
                      <p className="text-black text-base mb-3 leading-relaxed">{review.text}</p>
                      <p className="text-sm text-gray-700">Posted on {review.date}</p>
                    </div>
                  ))}
                </div>
                {visibleReviews < allReviews.length && (
                  <div className="text-center mt-10">
                    <button 
                      onClick={() => setVisibleReviews(v => v + 6)} 
                      className="border border-gray-300 rounded-lg px-8 py-3 font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Load More Reviews
                    </button>
                  </div>
                )}
              </div>
            )}
            {selectedTab === 'faqs' && (
              <div className="space-y-6 max-w-3xl">
                {product.faqs?.map((faq, i) => (
                  <div key={i} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h4 className="font-bold text-lg mb-2 text-gray-900">{faq.q}</h4>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* You Might Also Like Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-3">You Might Also Like</h2>
            <p className="text-gray-600">Discover more products you&apos;ll love</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((item) => {
              const p = productList.find(prod => prod.id === item.id);
              if (!p) return null;
              return (
                <Link href={`/product/${item.id}`} key={item.id} className="group">
                  <div className="bg-gray-100 rounded-xl p-4 mb-4 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                    <div className="relative aspect-square">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-black">${item.price}</span>
                      {p.oldPrice && (
                        <span className="text-gray-400 line-through text-sm">${p.oldPrice}</span>
                      )}
                    </div>
                    {p.discount && (
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                        -{p.discount}% OFF
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Brands Section */}
        <div id="brands" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-3">Our Trusted Brands</h2>
            <p className="text-gray-600">Discover premium brands that share our commitment to quality</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((brandNum) => (
              <div key={brandNum} className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                <Image
                  src={`/brands/brand${brandNum}.svg`}
                  alt={`Brand ${brandNum}`}
                  width={120}
                  height={60}
                  className="filter brightness-0 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">We partner with the world&apos;s leading fashion brands to bring you the best quality products</p>
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              View All Brands
            </button>
          </div>
        </div>
      </div>
      
      <NewsletterSignup />
      <Footer />
    </div>
  );
}