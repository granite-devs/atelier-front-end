import React from 'react';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsList: [],
      filteredReviewsList: []
    };
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    // TODO - load review data on component load
    this.setFilter( () => true ); // Default "filter": displays all reviews.
  }

  // setFilter ( function `filter` )
  // filters the displayed reviews according to the inputted filter function
  setFilter(filter) {
    const reviewsList = this.state.reviewsList;
    const filteredReviewsList = [];
    for (let review of reviewsList) {
      if (filter(review)) {
        filteredReviewsList.push(review);
      }
    }
    this.setState({ filteredReviewsList });
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
