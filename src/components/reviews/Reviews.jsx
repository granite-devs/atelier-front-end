import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ReviewsList from './ReviewsList.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.fetchReviews(1, this.state.reviewsPerLoad);
  }

  fetchReviews(page, count, reviewsList = []) {
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
          'sort': 'newest',
          'product_id': this.props.productId
        }
      };

      console.log(intializationConfig);

      this.setState({ isLoading: true });
      axios(intializationConfig)
        .then((response) => {
          console.log(response.data);
          this.setAndFilterReviews(reviewsList, response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  loadMoreReviews() {
    const { reviewCount, reviewsList, reviewsPerLoad } = this.state;
    const page = (reviewCount + reviewsPerLoad) / reviewsPerLoad;
    console.log(page);
    this.fetchReviews(page, reviewsPerLoad, reviewsList);
  }

  // setFilter ( function `filter` )
  // sets the review filter to the input function, then refreshes the displayed reviews
  setFilter(filter) {
    this.setState({ filter }, () => {
      this.setAndFilterReviews(this.state.reviewsList);
    });
  }

  setAndFilterReviews(oldReviews, newReviews) {
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
    this.setState({ reviewsList, filteredReviewsList, reviewCount, moreToLoad, isLoading: false });
  }

  render() {
    const { name } = this.props;
    const { moreToLoad } = this.state;
    return (
      <>
        <h1>
          Ratings &amp; Reviews {name}
        </h1>
        <ReviewsList
          loadMoreReviews={moreToLoad ? this.loadMoreReviews : null}
          reviews={this.state.filteredReviewsList}
        />
      </>
    );
  }
}

export default Reviews;
