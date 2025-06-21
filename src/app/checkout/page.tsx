'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.2);
  const delivery = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + delivery;

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1200px] mx-auto py-10 px-4 sm:px-8">
        <nav className="text-sm text-neutral-500 mb-8 flex items-center gap-2 font-medium tracking-wide">
          <Link href="/" className="hover:text-black cursor-pointer">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-black cursor-pointer">Cart</Link>
          <span>/</span>
          <span className="text-black font-semibold">Checkout</span>
        </nav>
        <h1 className="text-4xl font-extrabold mb-10 text-black tracking-tight uppercase">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <p className="text-lg text-gray-700">Your cart is empty. You cannot proceed to checkout.</p>
            <Link href="/category/all" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-full font-semibold">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              {/* Add shipping form here */}
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" />
                <input type="text" placeholder="Address" className="w-full p-3 border rounded-lg" />
                <input type="text" placeholder="City" className="w-full p-3 border rounded-lg" />
                <input type="text" placeholder="Postal Code" className="w-full p-3 border rounded-lg" />
                <input type="text" placeholder="Country" className="w-full p-3 border rounded-lg" />
              </form>
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
                <button className="w-full mt-6 bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition">
                  Place Order
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
} 