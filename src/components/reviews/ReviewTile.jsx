import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { review } = this.props;
    return (
      <div className='reviewTile'>
        <h3>{review.summary}</h3>
      </div>
    );
  }
}

export default ReviewTile;
