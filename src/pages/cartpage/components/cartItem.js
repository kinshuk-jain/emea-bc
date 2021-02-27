import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { updateCartItems } from '../../../utils/cartUtils';
import { CartCounter } from '../../../components/cartCounter';
import { MaxAllowedItemsInCart } from '../../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
}));

export function CartItem(props) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(props.item.quantity);
  const item = props.item;

  const handleDecrement = () => {
    updateCartItems(props.itemId, quantity - 1);
    setQuantity(Math.max(quantity - 1, 0));
  };

  const handleIncrement = () => {
    updateCartItems(props.itemId, quantity + 1);
    setQuantity(Math.min(quantity + 1, MaxAllowedItemsInCart));
  };

  return quantity ? (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {item.details.Title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {item.details.Author}
        </Typography>
      </CardContent>
      <CardActions>
        <CartCounter
          count={quantity}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
        <Button
          size="small"
          onClick={() => {
            updateCartItems(props.itemId, 0);
            setQuantity(0);
          }}
        >
          Remove from cart
        </Button>
      </CardActions>
    </Card>
  ) : null;
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
