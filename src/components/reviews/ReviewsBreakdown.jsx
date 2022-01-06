import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ReviewTile from './ReviewTile.jsx';
import StarRating from '../shared/StarRating.jsx';
import BreakdownBar from './BreakdownBar.jsx';
import CharacteristicBar from './CharacteristicBar.jsx';

class ReviewsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingsToFilter: {}
    };
    this.toggleRatingFilter = this.toggleRatingFilter.bind(this);
  }

  clearAllFilters() {
    this.setState({ ratingsToFilter: {} });
    this.props.setFilter((review) => true);
  }

  toggleRatingFilter(stars) {
    const { ratingsToFilter } = this.state;
    if (ratingsToFilter[stars]) {
      ratingsToFilter[stars] = false;
    } else {
      ratingsToFilter[stars] = true;
    }
    let allFiltersOff = true;
    for (let rating in ratingsToFilter) {
      if (ratingsToFilter[rating]) {
        allFiltersOff = false;
      }
    }
    this.props.setFilter((review) => {
      return (allFiltersOff || ratingsToFilter[review.rating]);
    });
    this.setState({ ratingsToFilter });
  }

  render() {
    const { reviewsMetaData } = this.props;
    const { ratingsToFilter } = this.state;
    if (reviewsMetaData) {
      const { ratings, recommended, characteristics } = reviewsMetaData;
      const ratingsArray = [];
      const filteredRatingsArray = [];
      let ratingsSum = 0;
      let reviewCount = 0;
      for (let rating in ratings) {
        ratingsSum += parseInt(ratings[rating]) * rating;
        reviewCount += parseInt(ratings[rating]);
        ratingsArray.push(rating);
        if (ratingsToFilter[rating]) {
          filteredRatingsArray.push(rating);
        }
      }
      ratingsArray.reverse();
      if (reviewCount === 0) {
        return null;
      }
      const avgRating = Math.round(ratingsSum / reviewCount * 10) / 10;
      const recommendPercentage = Math.round((recommended.true / reviewCount) * 100);

      const characteristicsNames = [];
      for (let name in characteristics) {
        characteristicsNames.push(name);
      }
      const characteristicsText = {
        'Size': ['A size too small', 'A size too wide'],
        'Width': ['Too narrow', 'Too wide'],
        'Comfort': ['Uncomfortable', 'Perfect'],
        'Quality': ['Poor', 'Perfect'],
        'Length': ['Runs Short', 'Runs long'],
        'Fit': ['Runs tight', 'Runs long']
      };
      return (
        <div className='reviewsBreakdown'>
          <span className='avgRating'>{avgRating}</span>
          <StarRating rating={avgRating} />
          <br></br>
          {filteredRatingsArray.length > 0 ? (
            <>
              <span>Filters: </span>
              <span className='filterSpan' onClick={() => this.clearAllFilters()}>
                Clear all
              </span>
              <br></br>
            </>
          ) : null}
          {filteredRatingsArray.map((stars) => (
            <span
              key={stars}
              className='filterSpan'
              onClick={() => this.toggleRatingFilter(stars)}
            >
              {stars} Stars
            </span>
          ))}
          {ratingsArray.map((stars, i) => (
            <BreakdownBar
              key={i}
              stars={stars}
              reviews={ratings[stars]}
              total={reviewCount}
              onClick={this.toggleRatingFilter}
            />
          ))}
          {characteristicsNames.map((name, i) => (
            <CharacteristicBar
              key={i}
              name={name}
              value={characteristics[name].value}
              meanings={characteristicsText[name]}
            />
          ))}
          <span className='recommendations'>
            {recommendPercentage}% of reviews recommend this product
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ReviewsBreakdown;
