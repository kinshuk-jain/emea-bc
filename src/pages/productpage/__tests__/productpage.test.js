import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductPage } from '../index';
import { BookDetailApi, Host } from '../../../constants';
import { updateCartItems } from '../../../utils/cartUtils';
import App from '../../../App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    bookId: '1',
  }),
}));

jest.mock('../../../utils/cartUtils', () => ({
  ...jest.requireActual('../../../utils/cartUtils'),
  updateCartItems: jest.fn(),
}));

const book = {
  Title: 'Fundamentals of Wavelets',
  Author: 'Goswami, Jaideva',
  Genre: 'tech',
  SubGenre: 'signal_processing',
  Height: '228',
  Publisher: 'Wiley',
};

test('loads and displays book details', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(book),
    })
  );
  render(
    <MemoryRouter>
      <ProductPage />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText(book.Title));
  expect(screen.getByText('by ' + book.Author)).toBeDefined();
  expect(screen.getByText('Genre: ' + book.Genre)).toBeDefined();
  expect(screen.getByText('Sub Genre: ' + book.SubGenre)).toBeDefined();
  expect(screen.getByText('Published by ' + book.Publisher)).toBeDefined();
  expect(screen.getByText('Height: ' + book.Height)).toBeDefined();
  expect(screen.getByRole('button', { name: '-' })).toBeDefined();
  expect(screen.getByRole('button', { name: '1' })).toBeDefined();
  expect(screen.getByRole('button', { name: '+' })).toBeDefined();
  expect(screen.getByText('Add to Cart')).toBeDefined();
});

test('shows cart page on clicking cart in header', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(book),
    })
  );
  render(
    <MemoryRouter initialEntries={['/books/1']}>
      <App />
    </MemoryRouter>
  );
  await waitFor(() => screen.getByText(book.Title));
  act(() => {
    fireEvent.click(screen.getByText('Cart'));
  });
  await waitFor(() =>
    expect(screen.getByText('Nothing to show')).toBeDefined()
  );
});

test('calls fetch with right url', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(book),
    })
  );
  render(
    <MemoryRouter>
      <ProductPage />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText(book.Title));
  expect(global.fetch.mock.calls[0][0]).toBe(
    Host + BookDetailApi.replace(':bookId', 1)
  );
});

test('adds item to cart', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(book),
    })
  );
  render(
    <MemoryRouter>
      <ProductPage />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText('Add to Cart'));
  act(() => {
    fireEvent.click(screen.getByText('Add to Cart'));
  });
  expect(updateCartItems).toHaveBeenCalled();
});

test('increments/decrements items on clicking counter', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(book),
    })
  );
  render(
    <MemoryRouter>
      <ProductPage />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText(book.Title));
  const increment = screen.getByRole('button', { name: '+' });
  const decrement = screen.getByRole('button', { name: '-' });

  act(() => {
    fireEvent.click(increment);
  });
  expect(screen.getByRole('button', { name: '2' })).toBeDefined();

  act(() => {
    fireEvent.click(decrement);
  });

  expect(screen.getByRole('button', { name: '1' })).toBeDefined();
});

test('shows header on top', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(booksList),
    })
  );
  render(
    <MemoryRouter>
      <ProductPage />
    </MemoryRouter>
  );
  await waitFor(() =>
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Book Shop')
  );
});
