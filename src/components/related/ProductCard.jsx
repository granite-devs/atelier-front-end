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
      category: '...',
      name: '...',
      price: '...',
      salePrice: '...',
      rating: null,
      primaryImg: null,
      features: [],
      displayModal: false,
      initialRequestMade: false
    }
    this.actionBtnClick = this.actionBtnClick.bind(this);
  }

  componentDidMount() {
    this.fetchProductInfo(this.props.productCardId);
    this.fetchProductPricePics(this.props.productCardId);
    this.fetchProductRating(this.props.productCardId);
  }

  fetchProductInfo(productIdToGet) {
    const { initialRequestMade } = this.state;

    if (!initialRequestMade) {
      this.setState({initialRequestMade: true});

      const infoRequestConfig = {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productIdToGet}`,
        headers: {Authorization: API_KEY}
      };

      axios(infoRequestConfig)
        .then((response) => {
          this.setState({name: response.data.name,
            category: response.data.category});
        })
        .catch((error) => {
          console.log('HTTP request to fetch product info failed');
        });
    }
  }

  fetchProductPricePics(productIdToGet) {
    const { initialRequestMade } = this.state;

    if (!initialRequestMade) {
      this.setState({initialRequestMade: true});

      const pricePicsRequestConfig = {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productIdToGet}/styles`,
        headers: {Authorization: API_KEY}
      };

      axios(pricePicsRequestConfig)
        .then((response) => {
          const data = response.data.results[0];
          this.setState({price: data.original_price,
            salePrice: data.sale_price,
            primaryImg: data.photos[0].url});
        })
        .catch((error) => {
          console.log('HTTP request to fetch product prices failed');
        });
    }
  }

  fetchProductRating(productIdToGet) {
    const { initialRequestMade } = this.state;

    if (!initialRequestMade) {
      this.setState({initialRequestMade: true});

      const ratingRequestConfig = {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/meta?product_id=${productIdToGet}`,
        headers: {Authorization: API_KEY}
      };

      axios(ratingRequestConfig)
        .then((response) => {
          const ratings = response.data.ratings;
          let ratingFraction;
          let [count, sum] = [0, 0];

          for (let key in ratings) {
            count += parseInt(ratings[key]);
            sum += parseInt(key) * parseInt(ratings[key]);
          }

          const average = sum / count;
          average > 0 ? ratingFraction = average : ratingFraction = 0;
          this.setState({rating: ratingFraction});
        })
        .catch((error) => {
          console.log('HTTP request to fetch product prices failed');
        });
    }
  }

  actionBtnClick(buttonLocation) {
    if (buttonLocation === 'relatedList') {
      console.log(`related action button for ${this.state.name} clicked`);

      this.setState({displayModal: !this.state.displayModal});
    }
  }

  render() {
    const { productCardId, updateAppProductId } = this.props;
    const { name, category, price, salePrice,
       rating, displayModal, features } = this.state;
    let primaryImg = this.state.primaryImg;

    if (!primaryImg) { primaryImg = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'; }

    return (
      <div className={displayModal ? 'product-card selected' : 'product-card'}>
        <ActionButton actionBtnClick={this.actionBtnClick}
          list={'related'}/>
          <img className='card-img' src={primaryImg}
            onClick={() => { updateAppProductId(productCardId); }}></img>
          <div className='card-info' onClick={() => { updateAppProductId(productCardId); }}>
            <p className='card-category'>{category}</p>
            <h4 className='card-name'>{name}</h4>
            <p className='card-price'>{'$'}{price}</p>
            <p className='card-sale'>{salePrice}</p>
          </div>
          <StarRating className='card-rating' rating={rating}/>
      </div>
    );
  }
}

export default ProductCard;
