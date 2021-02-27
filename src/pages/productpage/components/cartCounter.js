import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export function CartCounter(props) {
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount(Math.min(count + 1, props.maxValue));
  };

  const handleDecrement = () => {
    setCount(Math.max(count - 1, 1));
  };

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={handleDecrement}>-</Button>
      <Button>{count}</Button>
      <Button onClick={handleIncrement}>+</Button>
    </ButtonGroup>
  );
}

CartCounter.propTypes = {
  maxValue: PropTypes.number.isRequired,
};
