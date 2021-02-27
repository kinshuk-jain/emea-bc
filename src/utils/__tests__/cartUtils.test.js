import { updateCartItems, getCartItems, clearCart, KEY } from '../cartUtils';
import { storage } from '../storage';

describe('cart utils', () => {
  describe('Update Cart Items', () => {
    it('should update cart item when item is provided', () => {
      updateCartItems(1, 12, { value: '123' });
      const item = storage.getItem(KEY);
      expect(item).toBe(
        JSON.stringify({
          1: {
            quantity: 12,
            details: { value: '123' },
          },
        })
      );
    });

    it('should update cart item when item exists', () => {
      storage.setItem(
        KEY,
        JSON.stringify({
          1: {
            quantity: 1,
            details: { value: '123' },
          },
        })
      );
      updateCartItems(1, 12);
      const item = storage.getItem(KEY);
      expect(item).toBe(
        JSON.stringify({
          1: {
            quantity: 12,
            details: { value: '123' },
          },
        })
      );
    });

    it('should delete cart item when quantity is zero', () => {
      storage.setItem(
        KEY,
        JSON.stringify({
          1: {
            quantity: 1,
            details: { value: '123' },
          },
        })
      );
      updateCartItems(1, 0);
      const item = storage.getItem(KEY);
      expect(item).toBe(JSON.stringify({}));
    });

    it('should throw when quantity is not specified', () => {
      expect(() => updateCartItems(1)).toThrow();
    });
  });

  describe('get cart items', () => {
    it('should return all cart items', () => {
      updateCartItems(1, 12, { value: '123' });
      const items = getCartItems();
      expect(items).toStrictEqual({
        '1': { quantity: 12, details: { value: '123' } },
      });
    });
  });

  describe('clear cart', () => {
    it('should clear cart', () => {
      updateCartItems(1, 12, { value: '123' });
      clearCart();
      const items = getCartItems();
      expect(items).toStrictEqual({});
    });
  });
});
