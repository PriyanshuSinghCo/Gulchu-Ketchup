import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';

// Cart context
const CartContext = createContext();

/** Turn "₹99", "99.00", 99 into a finite number (0 if invalid) */
export function parsePrice(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }
  if (typeof value === "string") {
    const n = Number(value.replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function normalizeCartItem(item) {
  return {
    ...item,
    price: parsePrice(item.price),
    quantity: item.quantity || 1,
  };
}

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const payload = normalizeCartItem(action.payload);
      const existingItem = state.items.find(item => item.id === payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + 1, price: payload.price }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: (action.payload || []).map(normalizeCartItem),
      };

    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch {
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Calculate total items in cart
  const cartItemCount = state.items.reduce((total, item) => total + (item.quantity || 1), 0);

  // Calculate total price safely
  const cartTotal = state.items.reduce((total, item) => {
    return total + parsePrice(item.price) * (item.quantity || 1);
  }, 0);

  const [lastAdded, setLastAdded] = useState(null);
  const dismissLastAdded = useCallback(() => setLastAdded(null), []);

  // Add to cart function
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setLastAdded({ key: Date.now(), name: product.name, image: product.image });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  // Update quantity function
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  // Clear cart function
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    items: state.items,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    lastAdded,
    dismissLastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
