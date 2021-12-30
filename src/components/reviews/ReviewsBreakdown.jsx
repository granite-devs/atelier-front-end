import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ReviewTile from './ReviewTile.jsx';
import StarRating from '../shared/StarRating.jsx';
import BreakdownBar from './BreakdownBar.jsx';

class ReviewsBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reviewsMetaData } = this.props;
    console.log(reviewsMetaData);
    if (reviewsMetaData) {
      const { ratings } = reviewsMetaData;
      const ratingsArray = [];
      let ratingsSum = 0;
      let reviewCount = 0;
      for (let rating in ratings) {
        ratingsSum += parseInt(ratings[rating]) * rating;
        reviewCount += parseInt(ratings[rating]);
        ratingsArray.push(rating);
      }
      ratingsArray.reverse();
      const avgRating = Math.round(ratingsSum / reviewCount * 10) / 10;
      return (
        <div className='reviewsBreakdown'>
          <span className='avgRating'>{avgRating}</span>
          <StarRating rating={avgRating} />
          <br></br>
          {ratingsArray.map((stars) => (
            <BreakdownBar
              key={stars}
              stars={stars}
              reviews={ratings[stars]}
              total={reviewCount}
            />
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ReviewsBreakdown;
