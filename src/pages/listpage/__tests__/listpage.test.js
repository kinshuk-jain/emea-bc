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
import { CategoryPage } from '../index';
import App from '../../../App';
import { BookListApi, Host } from '../../../constants';
import { ErrorBoundary } from '../../../components/errorBoundary';

const booksList = [
  {
    Title: 'Fundamentals of Wavelets',
    Author: 'Goswami, Jaideva',
    Genre: 'tech',
    SubGenre: 'signal_processing',
    Height: '228',
    Publisher: 'Wiley',
  },
  {
    Title: 'Data Smart',
    Author: 'Foreman, John',
    Genre: 'tech',
    SubGenre: 'data_science',
    Height: '235',
    Publisher: 'Wiley',
  },
  {
    Title: 'Superfreakonomics',
    Author: 'Dubner, Stephen',
    Genre: 'science',
    SubGenre: 'economics',
    Height: '179',
    Publisher: 'HarperCollins',
  },
];

test('loads and displays books', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(booksList),
    })
  );
  render(<CategoryPage />);

  await waitFor(() => screen.getByText(booksList[0].Title));
  expect(screen.getAllByText('Book in detail').length).toBe(3);
  expect(screen.getByText(booksList[1].Title)).toBeDefined();
  expect(screen.getByText(booksList[1].Author)).toBeDefined();

  expect(screen.getByText(booksList[2].Title)).toBeDefined();
  expect(screen.getByText(booksList[2].Author)).toBeDefined();
});

test('calls fetch with right endpoint', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(booksList),
    })
  );
  render(<CategoryPage />);

  await waitFor(() => screen.getByText(booksList[0].Title));
  expect(global.fetch.mock.calls[0][0]).toBe(Host + BookListApi);
});

test('throws when data cannot be fetched', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(booksList),
    })
  );

  render(
    <ErrorBoundary fallback={() => <h2>failed to load</h2>}>
      <CategoryPage />
    </ErrorBoundary>
  );

  await waitFor(() => expect(screen.getByText('failed to load')).toBeDefined());
});

test('shows cart page on clicking cart in header', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(booksList),
    })
  );
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitFor(() => screen.getByText(booksList[0].Title));
  act(() => {
    fireEvent.click(screen.getByText('Cart'));
  });
  await waitFor(() =>
    expect(screen.getByText('Nothing to show')).toBeDefined()
  );
});

test('shows product on clicking book in detail', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(booksList),
    })
  );
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitFor(() => screen.getByText(booksList[0].Title));
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(booksList[0]),
    })
  );
  act(() => {
    fireEvent.click(screen.getAllByText('Book in detail')[0]);
  });
  await waitFor(() =>
    expect(screen.getByText('Genre: ' + booksList[0].Genre)).toBeDefined()
  );
});

test('shows header on top', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(booksList),
    })
  );
  render(<CategoryPage />);
  await waitFor(() =>
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Book Shop')
  );
});
