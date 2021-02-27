import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { CartRoute, Host, BookDetailApi } from '../../constants';
import { CartCounter } from './components/cartCounter';
import { Header } from '../../components/header';
import { updateCartItems } from '../../utils/cartUtils';
import { checkStatus } from '../../utils/fetchUtils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
  },
  buttons: {
    marginTop: 30,
    marginLeft: 10,
  },
}));

export function ProductPage() {
  const classes = useStyles();
  const [bookDetails, setBookDetails] = useState({});
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);

  let { bookId } = useParams();

  useEffect(() => {
    function fetchBookDetails() {
      fetch(Host + BookDetailApi.replace(':bookId', bookId))
        .then(checkStatus)
        .then(res => res.json())
        .then(bookDetailsObj => setBookDetails(bookDetailsObj))
        .catch(e => setError(e.response));
    }
    fetchBookDetails();
  }, []);

  const maxAllowedItemsInCart = 20;

  const handleIncrement = () => {
    setCount(Math.min(count + 1, maxAllowedItemsInCart));
  };

  const handleDecrement = () => {
    setCount(Math.max(count - 1, 1));
  };

  if (error) {
    throw error;
  }

  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.content} elevation={0}>
            <Typography variant="h5" component="h2">
              {bookDetails.Title}
            </Typography>
            <Typography color="textSecondary" component="h4" gutterBottom>
              by {bookDetails.Author}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.content} elevation={0}>
            <Typography
              className={classes.text}
              color="textSecondary"
              gutterBottom
            >
              Genre: {bookDetails.Genre}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.content} elevation={0}>
            <Typography
              className={classes.text}
              color="textSecondary"
              gutterBottom
            >
              SubGenre: {bookDetails.SubGenre}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Divider light />
      <Paper className={classes.content} elevation={0}>
        <Typography color="textSecondary" gutterBottom className={classes.text}>
          Published by {bookDetails.Publisher}
        </Typography>
        <div className={classes.buttons}>
          <CartCounter
            count={count}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
          <Button
            color="primary"
            onClick={() => updateCartItems(bookId, count, bookDetails)}
          >
            Add to Cart
          </Button>
        </div>
      </Paper>
    </div>
  );
}
