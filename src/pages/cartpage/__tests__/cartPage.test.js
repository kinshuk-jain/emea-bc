import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CartPage } from '../index';
import {
  updateCartItems,
  getCartItems,
  clearCart,
} from '../../../utils/cartUtils';

const book = {
  Title: 'Fundamentals of Wavelets',
  Author: 'Goswami, Jaideva',
  Genre: 'tech',
  SubGenre: 'signal_processing',
  Height: '228',
  Publisher: 'Wiley',
};

afterEach(() => {
  clearCart();
});

test('loads and displays cart', async () => {
  updateCartItems(1, 5, book);
  render(<CartPage />);

  await waitFor(() => screen.getByText(book.Title));
  expect(screen.getByText(book.Author)).toBeDefined();
  expect(screen.getByRole('button', { name: '-' })).toBeDefined();
  expect(screen.getByRole('button', { name: '5' })).toBeDefined();
  expect(screen.getByRole('button', { name: '+' })).toBeDefined();
  expect(
    screen.getByRole('button', { name: 'Remove from cart' })
  ).toBeDefined();
  expect(screen.getByRole('button', { name: 'Clear cart' })).toBeDefined();
});

test('allows clearing cart', async () => {
  updateCartItems(1, 5, book);
  render(<CartPage />);

  await waitFor(() => screen.getByText(book.Title));
  const clearCart = screen.getByRole('button', { name: 'Clear cart' });
  act(() => {
    fireEvent.click(clearCart);
  });
  const items = getCartItems();
  expect(items).toStrictEqual({});
});

test('allows removing a book from cart', async () => {
  updateCartItems(1, 5, book);
  render(<CartPage />);

  await waitFor(() => screen.getByText(book.Title));
  const removeFromCart = screen.getByRole('button', {
    name: 'Remove from cart',
  });
  act(() => {
    fireEvent.click(removeFromCart);
  });
  const items = getCartItems();
  expect(items).toStrictEqual({});
});

test('allows updating quantity in cart', async () => {
  updateCartItems(1, 5, book);
  render(<CartPage />);

  await waitFor(() => screen.getByText(book.Title));
  const decrement = screen.getByRole('button', {
    name: '-',
  });
  const increment = screen.getByRole('button', {
    name: '+',
  });
  act(() => {
    fireEvent.click(decrement);
  });
  let items = getCartItems();
  expect(items[1].quantity).toBe(4);

  act(() => {
    fireEvent.click(increment);
  });
  items = getCartItems();
  expect(items[1].quantity).toBe(5);
});

test('shows header on top', async () => {
  render(<CartPage />);
  await waitFor(() =>
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Book Shop')
  );
});
