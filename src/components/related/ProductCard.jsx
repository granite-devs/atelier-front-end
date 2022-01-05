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
      currentItemFeatures: {name: '', features: []},
      initialRequestMade: false
    }
    this.actionBtnClick = this.actionBtnClick.bind(this);

    this.fetchProductDetails = this.fetchProductDetails.bind(this); //todo: delete
  }

  componentDidMount() {
    const { productCardId, productId, checkCache } = this.props;
    const cachedProduct = checkCache(productCardId);

    console.log(`--> product card ${productCardId} mounted!`);
    console.log('cachedProduct: ', cachedProduct);

    if (cachedProduct) {
      console.log('cache match found for id', cachedProduct);
      this.setState({
        category: cachedProduct.category,
        name: cachedProduct.name,
        price: cachedProduct.price,
        salePrice: cachedProduct.salePrice,
        rating: cachedProduct.rating,
        primaryImg: cachedProduct.primaryImg,
        features: cachedProduct.features
      });
    }

    if (!cachedProduct) {
      console.log('making requests for ', cachedProduct);
      this.fetchProductInfo(productCardId, 'currentRelatedItem');
      this.fetchProductInfo(productId, 'currentItem');
      this.fetchProductPricePics(productCardId);
      this.fetchProductRating(productCardId);
    }
  }

  fetchProductDetails(productIdToGet) {
    const { initialRequestMade } = this.state;
    const { updateAppProductId, productId, relatedId } = this.props;

    console.log('FETCHING ALL');

    const productRequestRequestConfig = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productIdToGet}`,
      headers: {Authorization: API_KEY}
    };

    const stylesRequestConfig = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productIdToGet}/styles`,
      headers: {Authorization: API_KEY}
    };

    const ratingRequestConfig = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/meta?product_id=${productIdToGet}`,
      headers: {Authorization: API_KEY}
    };

    const productRequest = axios(productRequestRequestConfig);
    const stylesRequest = axios(stylesRequestConfig);
    const ratingRequest = axios(ratingRequestConfig);

    axios.all([productRequest, stylesRequest, ratingRequest])
      .then(axios.spread((...responses) => {
        const productResponse = responses[0];
        const stylesResponse = responses[1];
        const ratingResponse = responses[2];

        let productObjectToCache = {
          details: productResponse.data,
          styles: stylesResponse.data,
          rating: ratingResponse.data
        }

        updateAppProductId(productId, productObjectToCache, productIdToGet);

      }))
      .catch(errors => {
        console.log('error fetching requests!', errors);
      })
  }

  fetchProductInfo(productIdToGet, stateToUpdate) {
    const { initialRequestMade } = this.state;

    if (!initialRequestMade) {
      console.log('fetching info for', productIdToGet);
      this.setState({initialRequestMade: true});

      const infoRequestConfig = {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productIdToGet}`,
        headers: {Authorization: API_KEY}
      };

      axios(infoRequestConfig)
        .then((response) => {
          const { name, category } = response.data;
          let features = response.data.features;

          if (stateToUpdate === 'currentRelatedItem') {
            features.forEach(feature => {
              feature['belongsTo'] = 'relatedItem';
            });

            this.setState({
              name: name,
              category: category,
              features: features
            });
          }

          if (stateToUpdate === 'currentItem') {
            features.forEach(feature => {
              feature['belongsTo'] = 'currentItem';
            });

            this.setState({
              currentItemFeatures: {name: name, features: features}
            });
          }
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
          this.setState({
            price: data.original_price,
            salePrice: data.sale_price,
            primaryImg: data.photos[0].url
          });
        })
        .catch((error) => {
          console.error('HTTP request to fetch product prices failed');
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
          console.log('HTTP request to fetch product rating failed');
        });
    }
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

  render() {
    console.log('PRODUCT CARD RENDER------');


    const { productCardId, updateAppProductId, currentList, hidden } = this.props;
    const { name, category, price, salePrice, rating,
      features, currentItemFeatures, displayModal } = this.state;

    const productObjectToCache = {
      name: name, category: category, price: price, salePrice: salePrice,
      rating:rating, features: features, primaryImg: primaryImg
    };

    let primaryImg = this.state.primaryImg;
    if (!primaryImg) { primaryImg = 'https://tinyurl.com/5nur3x7w'; }

    let compareModal;
    if (currentList === 'related') {
      compareModal = <CompareModal relatedItemName={name}
          relatedItemFeatures={features}
          displayModal={displayModal}
          currentItemFeatures={currentItemFeatures}
          actionBtnClick={this.actionBtnClick} /> ;
    }

    return (
      <div>
        <div onClick={() => { this.fetchProductDetails(productCardId); }}>CLICK MEEEE</div>
        {compareModal}
        <div className={hidden ? 'product-card hidden' : 'product-card'}>
          <ActionButton actionBtnClick={this.actionBtnClick}
            currentList={currentList}/>
            <img className='card-img' src={primaryImg}
              onClick={() => { updateAppProductId(productCardId, productObjectToCache); }}>
              </img>
            <div className='card-info'
              onClick={() => { updateAppProductId(productCardId, productObjectToCache); }}>
              <p className='card-category'>{category}</p>
              <p className='card-name'>{name}</p>
              <p className='card-price'>{'$'}{price}</p>
              <p className='card-sale'>{salePrice}</p>
            </div>
            <StarRating className='card-rating' rating={rating}/>
        </div>
      </div>
    );
  }
}

export default ProductCard;
