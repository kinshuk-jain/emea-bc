import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Header } from '../../components/header';
import { getCartItems, clearCart } from '../../utils/cartUtils';
import { CartItem } from './components/cartItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  clearCart: {
    textAlign: 'right',
    padding: 2,
    marginTop: 5,
  },
}));

export function CartPage() {
  const classes = useStyles();
  const cartItems = getCartItems();
  const numItems = Object.keys(cartItems).length;
  const [emptyCart, setEmptyCart] = useState(numItems === 0);

  return (
    <div className={classes.root}>
      <Header />
      {emptyCart ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '50vh' }}
        >
          <Grid item xs={3}>
            Nothing to show
          </Grid>
        </Grid>
      ) : (
        <div>
          <div className={classes.clearCart}>
            <Button
              color="primary"
              onClick={() => {
                clearCart();
                setEmptyCart(true);
              }}
            >
              Clear cart
            </Button>
          </div>
          {Object.keys(cartItems).map(bookId => {
            return (
              <CartItem item={cartItems[bookId]} key={bookId} itemId={bookId} />
            );
          })}
        </div>
      )}
    </div>
  );
}
