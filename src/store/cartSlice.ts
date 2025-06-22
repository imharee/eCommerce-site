import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  color?: string;
  size?: string;
  cartItemId?: string; // Unique identifier for cart items
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Generate unique cart item ID
const generateCartItemId = (item: CartItem): string => {
  return `${item.id}-${item.color || 'default'}-${item.size || 'default'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = { ...action.payload };
      
      // Check if item with same id, color, and size already exists
      const existing = state.items.find(item => 
        item.id === newItem.id && 
        item.color === newItem.color && 
        item.size === newItem.size
      );
      
      if (existing) {
        // Update quantity of existing item
        existing.quantity += newItem.quantity;
      } else {
        // Add new item with unique cart item ID
        newItem.cartItemId = generateCartItemId(newItem);
        state.items.push(newItem);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      // Remove by cartItemId if provided, otherwise by id
      state.items = state.items.filter(item => 
        item.cartItemId !== action.payload && item.id !== action.payload
      );
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number; cartItemId?: string }>) {
      const item = state.items.find(item => 
        item.cartItemId === action.payload.cartItemId || item.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 