import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsList: [],
      filteredReviewsList: [],
      filter: () => true // Default "filter": displays all reviews.
    };
    this.loadReviews = this.loadReviews.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    this.loadReviews(1, 2);
  }

  loadReviews(page, count) {
    const intializationConfig = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products',
      headers: {
        Authorization: API_KEY,
      },
      params: {
        page,
        count,
        'product_id': this.props.productId,
        'sort': 'newest'
      }
    };

    axios(intializationConfig)
      .then((response) => {
        this.setAndFilterReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // setFilter ( function `filter` )
  // sets the review filter to the input function, then refreshes the displayed reviews
  setFilter(filter) {
    this.setState({ filter }, () => {
      this.setAndFilterReviews(this.state.reviewsList);
    });
  }

  setAndFilterReviews(reviewsList) {
    const filter = this.state.filter;
    const filteredReviewsList = [];
    for (let review of reviewsList) {
      if (filter(review)) {
        filteredReviewsList.push(review);
      }
    }
    this.setState({ reviewsList, filteredReviewsList });
  }

  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
      </>
    );
  }
}

export default Reviews;
