import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reviews, loadMoreReviews } = this.props;
    return (
      <div className='reviewsListContainer'>
        <div className='reviewsList'>
          <ul>
            {reviews.map((review) => (
              <ReviewTile key={review.review_id} review={review}/>
            ))}
          </ul>
        </div>
        {loadMoreReviews ? <button
          className='moreReviewsBtn'
          onClick={() => loadMoreReviews()}
        >More Reviews</button> : null}
        <button
          className='addReviewBtn'
          onClick={() => {}}
        >Add Review</button>
      </div>
    );
  }
}

export default ReviewsList;
