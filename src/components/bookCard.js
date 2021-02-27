import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const cardStyles = makeStyles({
  root: {
    width: '50%',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export function BookCard(props) {
  const classes = cardStyles();
  const { book, bookDetailHandler } = props;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {book.Title}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {book.Author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={bookDetailHandler}>
          Book in detail
        </Button>
      </CardActions>
    </Card>
  );
}

BookCard.propTypes = {
  bookDetailHandler: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
};
