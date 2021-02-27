import { storage } from './storage';
const KEY = 'cart_items';

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
          quantity,
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
  return storage.getItem(KEY);
};
