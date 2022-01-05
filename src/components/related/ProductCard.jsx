import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

import StarRating from '../shared/StarRating.jsx';
import ActionButton from './ActionButton.jsx';
import CompareModal from './CompareModal.jsx';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      features: [],
      displayModal: false,
      componentMounted: true
    }
    this.actionBtnClick = this.actionBtnClick.bind(this);
  }

  componentDidMount() {
    const { productCardId, productId, checkCache } = this.props;
    const cachedProduct = checkCache(productCardId);

    console.log(`--> product card ${productCardId} mounted!`);
    this.setState({componentMounted: true});
  }

  actionBtnClick(buttonLocation) {
    console.log('clicky');
    if (buttonLocation === 'relatedList') {
      this.setState({displayModal: !this.state.displayModal});
    }

    if (buttonLocation === 'yourOutfit') {
      this.props.removeItemFromOutfit(this.props.productCardId);
    }
  }

  getRatingFraction(ratings) {
    let ratingFraction;
    let [count, sum] = [0, 0];

    for (let key in ratings) {
      count += parseInt(ratings[key]);
      sum += parseInt(key) * parseInt(ratings[key]);
    }

    const average = sum / count;
    return average > 0 ? ratingFraction = average : ratingFraction = 0;
  }

  render() {
    const { productCardId, updateAppProductId, currentList, hidden, cardData } = this.props;
    const { displayModal, componentMounted } = this.state;

    let compareModal;
    if (currentList === 'related') {
      compareModal = <CompareModal relatedItemName={name}
          //relatedItemFeatures={features}
          displayModal={displayModal}
          //currentItemFeatures={currentItemFeatures}
          actionBtnClick={this.actionBtnClick} /> ;
    }

    let [ category, name, price, sale, rating ] = [ '...', '...', '...', '...', 0];
    let primaryImg = 'https://tinyurl.com/5nur3x7w';

    if (cardData) {
      console.log('assembling card data from the cache!');
      category = cardData.details.category;
      name = cardData.details.name;
      price = cardData.styles.results[0].original_price;
      sale = cardData.styles.results[0].sale;
      rating = this.getRatingFraction(cardData.reviews.ratings);

      const photoPath = cardData.styles.results[0].photos[0].url;
      if (photoPath) { primaryImg = photoPath };
    }

    if (componentMounted) {
      return (
        <div>
          {/* {compareModal}
           */}
          <div className={hidden ? 'product-card hidden' : 'product-card'}>
            <ActionButton actionBtnClick={this.actionBtnClick}
              currentList={currentList}/>
              <img className='card-img' src={primaryImg}
                onClick={() => { updateAppProductId(productCardId); }}>
                </img>
              <div className='card-info'
                onClick={() => { updateAppProductId(productCardId); }}>
                <p className='card-category'>{category}</p>
                <p className='card-name'>{name}</p>
                <p className='card-price'>{'$' + price}</p>
                <p className='card-sale'>{sale}</p>
              </div>
              <StarRating className='card-rating' rating={rating}/>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default ProductCard;
