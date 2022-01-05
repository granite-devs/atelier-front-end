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

  const scrollToReview = () => {
    window.scrollTo({
      top: 3000,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div id='starRating'>
        <StarRating rating={avgRating} />
      </div>
      <div onClick={scrollToReview} id='readReview'>
        Read all [{reviewCount}]review(s)
      </div>
    </>
  );
};

export default AverageRating;

