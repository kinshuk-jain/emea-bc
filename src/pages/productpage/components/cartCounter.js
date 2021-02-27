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

  return (
    <div className={classes.root}>
      <ButtonGroup size="small">
        <Button onClick={props.handleDecrement}>-</Button>
        <Button>{props.count}</Button>
        <Button onClick={props.handleIncrement}>+</Button>
      </ButtonGroup>
    </div>
  );
}

CartCounter.propTypes = {
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
