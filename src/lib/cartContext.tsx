import React, { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  image?: string;
  variant?: any;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant?: any) => void;
  clearCart: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<any> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === item.id && JSON.stringify(i.variant) === JSON.stringify(item.variant)
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + item.quantity };
        return copy;
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string, variant?: any) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && JSON.stringify(i.variant) === JSON.stringify(variant))));
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, count }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export type { CartItem };
