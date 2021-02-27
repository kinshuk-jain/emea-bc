import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 10,
  },
}));

export function CartCounter(props) {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount(Math.min(count + 1, props.maxValue));
  };

  const handleDecrement = () => {
    setCount(Math.max(count - 1, 1));
  };

  return (
    <div className={classes.root}>
      <ButtonGroup size="small">
        <Button onClick={handleDecrement}>-</Button>
        <Button>{count}</Button>
        <Button onClick={handleIncrement}>+</Button>
      </ButtonGroup>
    </div>
  );
}

CartCounter.propTypes = {
  maxValue: PropTypes.number.isRequired,
};
