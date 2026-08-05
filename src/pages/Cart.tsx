import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../lib/cartContext';
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  const { items, clearCart, removeItem } = useCart();

  const total = items.reduce((s, i) => s + (i.price || 0) * i.quantity, 0);

  const handleOrder = () => {
    if (!items.length) return;
    const lines = items.map((it) => `${it.name} x${it.quantity}`).join('%0A');
    const msg = encodeURIComponent(`Hello, I'd like to place an order:%0A${lines}%0A`);
    const wa = `https://wa.me/919171303700?text=${msg}`;
    window.open(wa, '_blank');
    clearCart();
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-dark-purple mb-6 flex items-center gap-3">
            <ShoppingCart className="w-6 h-6" />
            Your Cart
          </h1>

          {!items.length && (
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <p className="mb-4">Your cart is empty.</p>
              <Link to="/products" className="text-dark-purple font-semibold">
                Browse Products
              </Link>
            </div>
          )}

          {items.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
              {items.map((it) => (
                <div key={it.id + JSON.stringify(it.variant)} className="flex items-center gap-4">
                  <img src={it.image} className="w-20 h-20 object-cover rounded-lg" alt={it.name} />
                  <div className="flex-1">
                    <div className="font-semibold text-dark-purple">{it.name}</div>
                    <div className="text-sm text-soft-ink/70">Qty: {it.quantity}</div>
                  </div>
                  <div className="text-dark-purple font-bold">₹{(it.price || 0) * it.quantity}</div>
                  <button onClick={() => removeItem(it.id, it.variant)} className="text-sm text-red-500">Remove</button>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t border-dark-purple/10">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-xl font-bold">₹{total}</div>
              </div>

              <div className="pt-4 flex gap-3">
                <button onClick={handleOrder} className="flex-1 bg-golden-yellow text-dark-purple py-3 rounded-xl font-bold">
                  Order Now
                </button>
                <button onClick={clearCart} className="px-4 py-3 border rounded-xl">Clear</button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
