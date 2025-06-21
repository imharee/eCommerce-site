'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, CheckCircle, Ticket, ArrowRight } from 'lucide-react';
import Footer from '../../components/Footer';
import NewsletterSignup from '../../components/NewsletterSignup';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptKey, setPromptKey] = useState(0);

  // Mock: calculate subtotal, discount, delivery fee
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.2);
  const delivery = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + delivery;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleApplyPromo = () => {
    alert('Promo code functionality not implemented yet!');
  };

  // Show prompt for 2.1 seconds when triggered
  useEffect(() => {
    if (showPrompt) {
      const timer = setTimeout(() => setShowPrompt(false), 2100);
      return () => clearTimeout(timer);
    }
  }, [showPrompt, promptKey]);

  return (
    <div className="bg-white min-h-screen w-full relative">
      <div className="max-w-[1200px] mx-auto py-10 px-4 sm:px-8">
        <nav className="text-sm text-neutral-500 mb-8 flex items-center gap-2 font-medium tracking-wide">
          <Link href="/" className="hover:text-black cursor-pointer">Home</Link>
          <span>/</span>
          <span className="text-black font-semibold">Cart</span>
        </nav>
        <h1 className="text-4xl font-extrabold mb-10 text-black tracking-tight uppercase">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <p className="text-lg text-gray-700" role="status">
                  Your cart is empty.
                </p>
                 <Link href="/category/all" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-full font-semibold">
                  Continue shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 border border-gray-200 rounded-2xl p-6"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-black">{item.name}</h2>
                    <p className="text-sm text-gray-500">Size: {item.size || "Large"}</p>
                    <p className="text-sm text-gray-500">Color: {item.color || "White"}</p>
                    <p className="text-lg font-bold text-black mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-100 rounded-full p-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                      className="text-gray-600 hover:text-black"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <span className="text-base font-semibold w-8 text-center text-black">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="text-gray-600 hover:text-black"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                   <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
          <aside className="w-full lg:w-96">
            <div className="border border-gray-200 rounded-2xl p-6">
              <h2 className="font-bold text-xl mb-6 text-black">Order Summary</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-black">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Discount (-20%)</span><span className="font-semibold text-red-500">-${discount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery Fee</span><span className="font-semibold text-black">${delivery.toFixed(2)}</span></div>
                <hr className="my-4"/>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-black">${total.toFixed(2)}</span></div>
              </div>
              <div className="mt-6 flex gap-2">
                <div className="relative flex-1">
                   <Ticket size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                   <input type="text" placeholder="Add promo code" className="w-full bg-gray-100 rounded-full pl-12 pr-4 py-3 focus:outline-none placeholder-gray-500"/>
                </div>
                <button onClick={handleApplyPromo} className="bg-black text-white font-bold px-8 py-3 rounded-full hover:bg-gray-800 transition">
                  Apply
                </button>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full mt-4 bg-black text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition"
              >
                <span>Go to Checkout</span>
                <ArrowRight size={20}/>
              </button>
            </div>
          </aside>
        </div>
        {showPrompt && (
          <div key={promptKey} className="fixed top-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out" role="alert">
            <CheckCircle className="text-green-400" />
            <span>Your purchase completed successfully!</span>
          </div>
        )}
      </div>
      <NewsletterSignup />
      <Footer />
    </div>
  );
} 