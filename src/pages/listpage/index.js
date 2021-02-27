import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { BookCard } from '../../components/bookCard';
import { ErrorBoundary } from '../../components/errorBoundary';
import { CartRoute, ProductRoute } from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
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

  const history = useHistory();

  useEffect(() => {
    function fetchBooks() {
      fetch('http://localhost:3000/api/books')
        .then(res => res.json())
        .then(booksObj => setBooks(booksObj));
    }
    fetchBooks();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Book Shop
          </Typography>
          <Button color="inherit" onClick={() => history.push(CartRoute)}>
            Cart
          </Button>
        </Toolbar>
      </AppBar>
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
                  history.push(`${ProductRoute}/${bookIndex}`)
                }
              />
            </ErrorBoundary>
          );
        })}
      </main>
    </div>
  );
}
