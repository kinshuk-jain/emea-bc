import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { BookCard } from './components/bookCard';
import { ErrorBoundary } from '../../components/errorBoundary';
import { Header } from '../../components/header';
import { ProductRoute, Host, BookListApi } from '../../constants';
import { checkStatus } from '../../utils/fetchUtils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export function CategoryPage() {
  const classes = useStyles();

  const [books, setBooks] = useState({});
  const [error, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    function fetchBooks() {
      fetch(Host + BookListApi)
        .then(checkStatus)
        .then(res => res.json())
        .then(booksObj => {
          if (isMounted) {
            setBooks(booksObj);
          }
        })
        .catch(e => {
          if (isMounted) {
            setError(e.response);
          }
        });
    }
    fetchBooks();
    return () => (isMounted = false);
  }, []);

  if (error) {
    throw error;
  }

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        {Object.keys(books).map(bookIndex => {
          const book = books[bookIndex];
          return (
            <ErrorBoundary
              key={bookIndex}
              fallback={() => <h4>Could not load the book</h4>}
            >
              <BookCard
                book={book}
                bookDetailHandler={() =>
                  history.push(ProductRoute.replace(':bookId', bookIndex))
                }
              />
            </ErrorBoundary>
          );
        })}
      </main>
    </div>
  );
}
