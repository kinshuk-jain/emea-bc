import { storage } from './storage';
import { MaxAllowedItemsInCart } from '../constants';
export const KEY = 'cart_items';

export const updateCartItems = (id, quantity, value) => {
  const items = JSON.parse(storage.getItem(KEY));
  if (value && quantity > 0) {
    // add new item
    storage.setItem(
      KEY,
      JSON.stringify({
        ...items,
        [id]: {
          quantity,
          details: value,
        },
      })
    );
  } else if (items[id] && quantity > 0) {
    // item already exists, reduce quantity
    storage.setItem(
      KEY,
      JSON.stringify({
        ...items,
        [id]: {
          ...items[id],
          quantity: Math.min(MaxAllowedItemsInCart, quantity),
        },
      })
    );
  } else if (items[id] && quantity === 0) {
    // item already exists, remove item
    delete items[id];
    storage.setItem(KEY, JSON.stringify(items));
  } else {
    throw 'incorrect usage';
  }
  return;
};

export const getCartItems = () => {
  return JSON.parse(storage.getItem(KEY));
};

export const clearCart = () => {
  storage.setItem(KEY, JSON.stringify({}));
};
