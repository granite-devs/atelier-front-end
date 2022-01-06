import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ReviewsList from './ReviewsList.jsx';
import ReviewsBreakdown from './ReviewsBreakdown.jsx';
import CreateReview from './CreateReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsMetaData: null,
      reviewsList: [],
      filteredReviewsList: [],
      filter: () => true, // Default "filter": displays all reviews.
      reviewsPerLoad: 100,
      reviewCount: null,
      reviewsLoaded: 0,
      moreToLoad: true,
      isLoading: false,
      sortOrder: 'relevant',
      creatingReview: false
    };
    this.loadMoreReviews = this.loadMoreReviews.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.onReviewSubmitted = this.onReviewSubmitted.bind(this);
  }

  componentDidMount() {
    this.fetchReviewMetaData(() => {
      const { reviewsMetaData, reviewsPerLoad } = this.state;
      let reviewCount = 0;
      for (let rating in reviewsMetaData.ratings) {
        reviewCount += parseInt(reviewsMetaData.ratings[rating]);
      }
      this.setState({ reviewCount });
      this.fetchReviews(1, reviewsPerLoad);
    });
  }

  fetchReviewMetaData(callback = null) {
    const { productId } = this.props;
    const reviewsMetaData = JSON.parse(window.localStorage.getItem(productId)).reviews;
    this.setState({ reviewsMetaData }, callback);
  }

  fetchReviews(page, count, reviewsList = [], callback = null) {
    const { productId } = this.props;
    const { isLoading, sortOrder } = this.state;
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
          'product_id': this.props.productId,
          sort: sortOrder
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
    const { reviewsLoaded, reviewsList, reviewsPerLoad } = this.state;
    const page = (reviewsLoaded + reviewsPerLoad) / reviewsPerLoad;
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
    const reviewsLoaded = reviewsList.length;
    const moreToLoad = !(newReviews.length < this.state.reviewsPerLoad);
    const filter = this.state.filter;
    const filteredReviewsList = [];
    for (let review of reviewsList) {
      if (filter(review)) {
        filteredReviewsList.push(review);
      }
    }
    filteredReviewsList.sort(this.getSortFunction());
    this.setState(
      { reviewsList, filteredReviewsList, reviewsLoaded, moreToLoad, isLoading: false },
      callback
    );
  }

  getSortFunction() {
    const { sortOrder } = this.state;
    if (sortOrder === 'newest') {
      return (a, b) => {
        if (new Date(a.date) < new Date(b.date)) {
          return 1;
        } else {
          return -1;
        }
      };
    } else if (sortOrder === 'relevant') { // not sure how to sort for relevancy?
      return (a, b) => {
        const timeDiff = Math.abs(new Date(a.date) - new Date(b.date)) / (1000 * 60 * 60 * 24 * 7);
        const helpfulnessDiff = Math.abs(a.helpfulness - b.helpfulness);
        if (timeDiff > helpfulnessDiff) {
          if (new Date(a.date) < new Date(b.date)) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a.helpfulness < b.helpfulness) {
            return 1;
          } else {
            return -1;
          }
        }
      };
    } else if (sortOrder === 'helpful') {
      return (a, b) => {
        if (a.helpfulness < b.helpfulness) {
          return 1;
        } else {
          return -1;
        }
      };
    }
  }

  onReviewSubmitted() {
    const { reviewsLoaded } = this.state;
    this.fetchReviews(1, reviewsLoaded, [], () => {
      this.setState({creatingReview: false});
    });
  }

  handleSortChange({ target }) {
    const { reviewsLoaded } = this.state;
    this.setState({ sortOrder: target.value, reviewsList: [] }, () => {
      this.fetchReviews(1, reviewsLoaded);
    });
  }

  render() {
    const { name } = this.props;
    const { moreToLoad, reviewCount, creatingReview } = this.state;

    let createReviewModal;
    if (creatingReview) {
      createReviewModal = (
        <div className='modal'>
          <CreateReview
            reviewsMetaData={this.state.reviewsMetaData}
            onReviewSubmitted={this.onReviewSubmitted}
            closeFn={(() => this.setState({creatingReview: false})).bind(this)}
          />
        </div>
      );
    } else {
      createReviewModal = null;
    }

    return (
      <div id='reviews' className='reviews'>
        <h3>
          Ratings &amp; Reviews {name}
        </h3>
        <div className='reviews-container'>
          <div className='reviews-left'>
          <ReviewsBreakdown
            setFilter={this.setFilter}
            reviewsMetaData={this.state.reviewsMetaData}
          />
        </div>
        <div className='reviews-right'>
          <div className='header-container'>
            <span className='reviewsHeader'>{reviewCount} reviews, sorted by </span>
            <div className='custom-select'>
              <select name='sortOrder' onChange={this.handleSortChange}>
                <option value='relevant'>relevance</option>
                <option value='newest'>newest</option>
                <option value='helpful'>helpfulness</option>
              </select>
            </div>
          </div>
          <ReviewsList
            reviews={this.state.filteredReviewsList}
          />
          <div className='reviewButtons'>
            {moreToLoad ? <button
              className='moreReviewsBtn'
              onClick={() => this.loadMoreReviews()}
            >More Reviews</button> : null}
            <button
              className='addReviewBtn'
              onClick={() => this.setState({creatingReview: true})}
            >Add Review</button>
            {createReviewModal}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
