import React from 'react';
import Star from './Star.jsx';

const StarRating = (props) => {

  let { rating } = props;
  if (!rating) { // in case props are not properly passed, default to a rating of 0
    rating = 0;
  }
  const ratingFractions = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    ratingFractions.push(1);
  }
  ratingFractions.push(rating - ratingFractions.length);
  for (let i = Math.ceil(rating); i < 5; i++) {
    ratingFractions.push(0);
  }
  if (ratingFractions.length > 5) {
    ratingFractions.pop();
  }

  return (
    <div>
      {ratingFractions.map((fraction, i) => (
        <Star key={i} fraction={fraction}/>
      ))}
    </div>
  );
};

export default StarRating;
