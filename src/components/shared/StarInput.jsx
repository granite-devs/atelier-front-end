import React from 'react';
import Star from './Star.jsx';

class StarInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating
    };
    this.setRating = this.setRating.bind(this);
  }

  setRating(rating) {
    this.setState({ rating });
  }

  render() {
    let { rating } = this.state;
    if (!rating) { // in case props are not properly passed, default to a rating of 0
      rating = 0;
    }
    const ratingFractions = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      ratingFractions.push(1);
    }
    ratingFractions.push(rating - ratingFractions.length);
    for (let i = Math.ceil(rating); i < 5; i++) {
      ratingFractions.push(0);
    }
    if (ratingFractions.length > 5) {
      ratingFractions.pop();
    }

    const ratingText = {
      1: 'Poor',
      2: 'Fair',
      3: 'Average',
      4: 'Good',
      5: 'Great'
    }[rating];

    return (
      <div className='starInputContainer'>
        <input type='hidden' value={this.state.rating}></input>
        {ratingFractions.map((fraction, i) => (
          <div
            key={i}
            onClick={() => this.setRating(i + 1)}
            className='inputStar'
          >
            <Star fraction={fraction}/>
          </div>
        ))}
        {rating > 0 ? <span className='ratingText'>
          {`${rating} Stars - ${ratingText}`}
        </span> : <></>}
      </div>
    );
  }
}

export default StarInput;
