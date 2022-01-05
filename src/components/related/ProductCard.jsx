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

    this.fetchProductDetails(productCardId, 'currentRelatedItem');
    //this.fetchProductDetails(productId, 'currentItem');
  }

  fetchProductDetails(productIdToGet, stateToUpdate = 'currentRelatedItem') {
    const { initialRequestMade } = this.state;
    const { updateAppProductId, productId, relatedId, checkCache } = this.props;

    if (productIdToGet) {
      const cachedProduct = checkCache(productIdToGet);


      console.log('FETCHING ALL FOR PRODUCT ', productIdToGet);

      if (cachedProduct) {
        console.log(' CACHED PRODUCT: ----- ', cachedProduct);
        console.log('pulling from the cache and setting state!!');

        const { name } = cachedProduct.details;
        let features = cachedProduct.details;

        if (stateToUpdate === 'relatedItem') {
          features.forEach(feature => {
            feature['belongsTo'] = 'relatedItem';
          });

          const stateObject = this.stateBuilder(cachedProduct);

          this.setState(stateObject);
        }

        if (stateToUpdate === 'currentItem') {
          features.forEach(feature => {
            feature['belongsTo'] = 'currentItem';
          });

          this.setState({
            currentItemFeatures: {name: name, features: features}
          });
        }

      } else {
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

        const reviewsRequestConfig = {
          method: 'get',
          url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/meta?product_id=${productIdToGet}`,
          headers: {Authorization: API_KEY}
        };

        const productRequest = axios(productRequestRequestConfig);
        const stylesRequest = axios(stylesRequestConfig);
        const reviewsRequest = axios(reviewsRequestConfig);

        axios.all([productRequest, stylesRequest, reviewsRequest])
          .then(axios.spread((...responses) => {
            const productResponse = responses[0];
            const stylesResponse = responses[1];
            const reviewsResponse = responses[2];

            let productObjectToCache = {
              details: productResponse.data,
              styles: stylesResponse.data,
              reviews: reviewsResponse.data
            }

            updateAppProductId(productId, productObjectToCache, productIdToGet);

            const stateObject = this.stateBuilder(productObjectToCache);

            this.setState(stateObject);

          }))
          .catch(errors => {
            console.log('error fetching requests!', errors);
          })
      }
    }
  }

  stateBuilder(productCacheObject) {

    const { name, category } = productCacheObject.details;
    const { price, salePrice, results } = productCacheObject.styles;
    const { ratings } = productCacheObject.reviews;

    let features = productCacheObject.details.features;

      features.forEach(feature => {
        feature['belongsTo'] = 'relatedItem';
      });

      const ratingFraction = () => {
        let ratingFraction;
        let [count, sum] = [0, 0];

        for (let key in ratings) {
          count += parseInt(ratings[key]);
          sum += parseInt(key) * parseInt(ratings[key]);
        }

        const average = sum / count;
        if (average > 0 ) { return average };

        return 0;
      };

      const stateObject = {
        name: name,
        category: category,
        features: features,
        price: results[0].original_price,
        salePrice: results[0].sale_price,
        primaryImg: results[0].photos[0].url,
        rating: ratingFraction()
      }

      return stateObject;
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
    //console.log('PRODUCT CARD RENDER------');

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
              <p className='card-price'>{'$' + price}</p>
              <p className='card-sale'>{salePrice}</p>
            </div>
            <StarRating className='card-rating' rating={rating}/>
        </div>
      </div>
    );
  }
}

export default ProductCard;
