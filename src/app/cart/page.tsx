'use client';

import { ArrowRight, Ticket, Trash2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import NewsletterSignup from '../../components/NewsletterSignup';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.2);
  const delivery = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + delivery;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push('/checkout');
    } else {
      alert("Your cart is empty!");
    }
  };

  const handleApplyPromo = () => {
    alert('Promo code functionality not implemented yet!');
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center text-gray-600 hover:text-black">
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-black">Shopping Cart</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex text-sm text-neutral-500 mb-8 items-center gap-2 font-medium tracking-wide">
          <Link href="/" className="hover:text-black cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-black font-semibold">Cart</span>
        </nav>
        
        {/* Desktop Title */}
        <h1 className="hidden lg:block text-4xl font-extrabold mb-10 text-black tracking-tight uppercase">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Cart Items Section */}
          <div className="flex-1 space-y-4 lg:space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700 mb-4" role="status">
                  Your cart is empty.
                </p>
                <Link href="/category/all" className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                  Continue shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={item.cartItemId || `${item.id}-${index}`}
                  className="bg-white border border-gray-200 rounded-2xl p-4 lg:p-6"
                >
                  <div className="flex gap-4 lg:gap-6">
                    {/* Product Image */}
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="font-bold text-base lg:text-lg text-black truncate pr-2">{item.name}</h2>
                        <button
                          onClick={() => dispatch(removeFromCart(item.cartItemId || item.id))}
                          className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Size: {item.size || "Large"}</p>
                      <p className="text-sm text-gray-500 mb-3">Color: {item.color || "White"}</p>
                      
                      {/* Price and Quantity */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <p className="text-lg font-bold text-black">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 w-fit">
                          <button
                            onClick={() => dispatch(updateQuantity({ 
                              id: item.id, 
                              quantity: Math.max(1, item.quantity - 1),
                              cartItemId: item.cartItemId 
                            }))}
                            className="text-gray-600 hover:text-black p-1 flex-shrink-0"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <span className="text-sm font-semibold w-6 text-center text-black flex-shrink-0">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(updateQuantity({ 
                              id: item.id, 
                              quantity: item.quantity + 1,
                              cartItemId: item.cartItemId 
                            }))}
                            className="text-gray-600 hover:text-black p-1 flex-shrink-0"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary Section */}
          <aside className="w-full lg:w-96">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 lg:p-6 sticky top-20 lg:top-24">
              <h2 className="font-bold text-lg lg:text-xl mb-4 lg:mb-6 text-black">Order Summary</h2>
              
              {/* Summary Items */}
              <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-gray-600 mb-4 lg:mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount (-20%)</span>
                  <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-black">${delivery.toFixed(2)}</span>
                </div>
                <hr className="my-3 lg:my-4 border-gray-200"/>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="mb-4 lg:mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input 
                      type="text" 
                      placeholder="Add promo code" 
                      className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 lg:py-3 text-sm focus:outline-none placeholder:text-gray-600 placeholder:font-medium"
                    />
                  </div>
                  <button 
                    onClick={handleApplyPromo} 
                    className="bg-black text-white font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-full hover:bg-gray-800 transition text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-black text-white font-bold py-3 lg:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <span>Go to Checkout</span>
                <ArrowRight size={18} />
              </button>

              {/* Continue Shopping Link */}
              <div className="mt-4 text-center">
                <Link 
                  href="/category/all" 
                  className="text-sm text-gray-600 hover:text-black font-medium"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <NewsletterSignup />
      <Footer />
    </div>
  );
}
