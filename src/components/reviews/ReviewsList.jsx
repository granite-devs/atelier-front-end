import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { reviews, loadMoreReviews } = this.props;
    return (
      <>
        <div className='reviewsList'>
          <ul>
            {reviews.map((review) => (
              <ReviewTile key={review.review_id} review={review}/>
            ))}
          </ul>
        </div>
        {loadMoreReviews ? <button onClick={() => loadMoreReviews()}>More Reviews</button> : null}
      </>
    );
  }
}

export default ReviewsList;
