import React, { useState, useEffect } from 'react';
import StarRating from '../../shared/StarRating.jsx';

const AverageRating = ({state, updateState}) => {
  let ratingsSum = 0;
  let reviewCount = 0;
  for (let key in state.rating) {
    ratingsSum += parseInt(state.rating[key]) * key;
    reviewCount += parseInt(state.rating[key]);
  }
  const avgRating = Math.round(ratingsSum / reviewCount * 10) / 10;

  return (
    <>
      <StarRating rating={avgRating} />
    </>
  );
};

export default AverageRating;

