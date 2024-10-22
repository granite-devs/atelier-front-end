import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import timeAgo from '../../utils/timeAgo.js';
import StarRating from '../shared/StarRating.jsx';
import Reviews from './Reviews.jsx';
import ImageModal from '../shared/ImageModal.jsx';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFullBody: false,
      imageInModal: null
    };
    this.toggleFullBody = this.toggleFullBody.bind(this);
  }

  toggleFullBody() {
    const displayFullBody = !this.state.displayFullBody;
    this.setState({ displayFullBody });
  }

  render() {
    const { review, hasVotedHelpul, voteReviewHelpful, voteReviewUnhelpful } = this.props;
    const { displayFullBody, imageInModal } = this.state;
    const bodyToDisplay = displayFullBody ? review.body : review.body.substr(0, 250);
    const moreToDisplay = bodyToDisplay.length < review.body.length;
    const showMoreBtn = review.body.length > 250 ? (
      <a
        className='showMoreBtn'
        onClick={this.toggleFullBody}
      >
        Show {displayFullBody ? 'Less' : 'More'}
      </a>
    ) : null;
    const voteHelpfulBtns = !hasVotedHelpul ? (
      <div className='helpful'>
        <span>Was this review helpful? </span>
        <a onClick={() => {
          review.helpfulness++;
          voteReviewHelpful(review.review_id);
        }}>
          Yes ({review.helpfulness})
        </a>
        <span> / </span>
        <a onClick={() => {
          voteReviewUnhelpful(review.review_id);
        }}>
          No
        </a>
      </div>
    ) : (
      <div className='helpful'>
        <span>{review.helpfulness} users found this review useful</span>
      </div>
    );
    const salesResponse = review.response ? (
      <div className='salesResponse'>
        <b>Response from seller:</b>
        <p>{review.response}</p>
      </div>
    ) : null;
    const imageModal = imageInModal ? (
      <ImageModal
        image={imageInModal}
        closeFn={() => this.setState({ imageInModal: null })}
      />
    ) : null;
    return (
      <div className='reviewTile'>
        <span className='name-date'>{review.reviewer_name}, {timeAgo(review.date)}</span>
        <StarRating rating={review.rating}/>
        <h3>{review.summary}</h3>
        <p>{bodyToDisplay}{moreToDisplay ? '...' : ''}</p>
        {showMoreBtn}
        {review.photos.map((image, i) => (
          <div className='imgPreview' key={i}>
            <img
              className='thumbnail'
              src={image.url}
              height={65}
              onClick={() => this.setState({ imageInModal: image })}
            ></img>
          </div>
        ))}
        {review.recommend ? <p className='recommended'>&#9745; I recommend this product</p> : null}
        {salesResponse}
        {imageModal}
        {voteHelpfulBtns}
      </div>
    );
  }
}

export default ReviewTile;
