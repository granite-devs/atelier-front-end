import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ReviewsList from './ReviewsList.jsx';
import ReviewsBreakdown from './ReviewsBreakdown.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsMetaData: null,
      reviewsList: [],
      filteredReviewsList: [],
      filter: () => true, // Default "filter": displays all reviews.
      reviewsPerLoad: 2,
      reviewCount: 0,
      moreToLoad: true,
      isLoading: false
    };
    this.loadMoreReviews = this.loadMoreReviews.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    this.fetchReviewMetaData(() => {
      const { reviewsMetaData } = this.state;
      let reviewsToLoad = 0;
      for (let rating in reviewsMetaData.ratings) {
        reviewsToLoad += parseInt(reviewsMetaData.ratings[rating]);
      }
      this.fetchReviews(1, reviewsToLoad);
    });
  }

  fetchReviewMetaData(callback = null) {
    const { productId } = this.props;
    if (productId) {
      const intializationConfig = {
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/meta',
        headers: {
          Authorization: API_KEY,
        },
        params: {
          'product_id': this.props.productId
        }
      };

      axios(intializationConfig)
        .then((response) => {
          this.setState({ reviewsMetaData: response.data }, callback);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  fetchReviews(page, count, reviewsList = [], callback = null) {
    const { productId } = this.props;
    const { isLoading } = this.state;
    if (productId && !isLoading) {
      const intializationConfig = {
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews',
        headers: {
          Authorization: API_KEY,
        },
        params: {
          page,
          count,
          'product_id': this.props.productId
        }
      };

      this.setState({ isLoading: true });
      axios(intializationConfig)
        .then((response) => {
          this.setAndFilterReviews(reviewsList, response.data.results, callback);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  loadMoreReviews(callback = null) {
    const { reviewCount, reviewsList, reviewsPerLoad } = this.state;
    const page = (reviewCount + reviewsPerLoad) / reviewsPerLoad;
    this.fetchReviews(page, reviewsPerLoad, reviewsList, callback);
  }

  // setFilter ( function `filter` )
  // sets the review filter to the input function, then refreshes the displayed reviews
  setFilter(filter, callback = null) {
    this.setState({ filter }, () => {
      this.setAndFilterReviews(this.state.reviewsList, [], callback);
    });
  }

  setAndFilterReviews(oldReviews, newReviews, callback = null) {
    const reviewIds = {}; // keep track of IDs already in the list to eliminte duplicates
    const reviewsList = [];
    for (let review of oldReviews) {
      reviewsList.push(review);
      reviewIds[review.review_id] = true;
    }
    for (let review of newReviews) {
      if (!reviewIds[review.review_id]) {
        reviewsList.push(review);
      }
    }
    const reviewCount = reviewsList.length;
    const moreToLoad = newReviews.length === this.state.reviewsPerLoad;
    const filter = this.state.filter;
    const filteredReviewsList = [];
    for (let review of reviewsList) {
      if (filter(review)) {
        filteredReviewsList.push(review);
      }
    }
    this.setState(
      { reviewsList, filteredReviewsList, reviewCount, moreToLoad, isLoading: false },
      callback
    );
  }

  render() {
    const { name } = this.props;
    const { moreToLoad } = this.state;
    return (
      <>
        <h1>
          Ratings &amp; Reviews {name}
        </h1>
        <ReviewsBreakdown
          reviewsMetaData={this.state.reviewsMetaData}
        />
        <ReviewsList
          loadMoreReviews={moreToLoad ? this.loadMoreReviews : null}
          reviews={this.state.filteredReviewsList}
        />
      </>
    );
  }
}

export default Reviews;
