import React from 'react';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import QuestionsAnswers from './components/questions/QuestionsAnswers.jsx';
import Related from './components/related/Related.jsx';


import API_KEY from './config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null,
      outfitItems: [],
      cachedProducts: {},
      initialRequestMade: false
    };
    this.updateAppProductId = this.updateAppProductId.bind(this);
    this.addItemToOutfit = this.addItemToOutfit.bind(this);
    this.removeItemFromOutfit = this.removeItemFromOutfit.bind(this);
    this.checkCache = this.checkCache.bind(this);
    this.fetchProductDetails = this.fetchProductDetails.bind(this);
  }

  updateAppProductId(newProductId, productObject) {
    console.log('*attempting to update app product Id to', newProductId);

    const updateProductId = newProductId !== this.state.productId;

    console.log('will update product ID and cache: ', updateProductId);

    const updatedCache = {...this.state.cachedProducts};
    updatedCache[newProductId] = productObject;

    if (updateProductId) {
      this.setState({
        productId: newProductId,
        cachedProducts: updatedCache
      }, () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    } else {
      this.setState({
        cachedProducts: updatedCache
      });
    }

  }

  checkCache(productIdToCheck, callback) {
    console.log(`checking cache for ${productIdToCheck} \n `,
    this.state.cachedProducts[productIdToCheck]);

    return this.state.cachedProducts[productIdToCheck];
  }


  componentDidMount() {
    console.log('APP HAS MOUNTED----');

    const intializationConfig = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products',
      headers: {
        Authorization: API_KEY,
      },
    };

    axios(intializationConfig)
      .then((response) => {

        this.setState({ // sets the id of the first product in the list as the init id
          productId: response.data[0].id,
          initialRequestMade: true
        }, () => {
          this.fetchProductDetails(response.data[0].id);
        });

      })
      .catch((error) => {
        console.log(error);
      });
    }

  fetchProductDetails(productIdToGet) {
    console.log('--> fetching details for', productIdToGet);

    const { initialRequestMade } = this.state;

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

          let stateCache = this.state.cachedProducts;
          stateCache[productIdToGet] = productObjectToCache;

          console.log('--> app fetch product details complete');
          this.setState({
            cachedProducts: stateCache
          });

        }))
        .catch(errors => {
          console.log('error fetching requests!', errors);
        })
  }

  addItemToOutfit(productToAdd) {
    const outfitItems = this.state.outfitItems;

    if (!outfitItems.includes(productToAdd)) {
      this.setState({outfitItems: [...this.state.outfitItems, productToAdd]});
    }
  }

  removeItemFromOutfit(productToRemove) {
    const filteredOutfitList = this.state.outfitItems.filter(item => {
      return productToRemove !== item;
    });

    this.setState({outfitItems: filteredOutfitList});
  }


  render() {
    //console.log('APP RENDER------');

    const { productId, outfitItems, initialRequestMade, cachedProducts } = this.state;

    if (initialRequestMade) {
      return (
        <div>
          <Overview key={`${productId}-1`} productId={productId} />
          <Related
            key={`${productId}-2`}
            productId={productId}
            checkCache={this.checkCache}
            updateAppProductId={this.updateAppProductId}
            addItemToOutfit={this.addItemToOutfit}
            removeItemFromOutfit={this.removeItemFromOutfit}
            outfitItems={outfitItems}
            fetchProductDetails={this.fetchProductDetails}
            cachedProducts={cachedProducts}
          />
          {/* <QuestionsAnswers key={`${productId}-3`} productId={productId} />
          <Reviews key={`${productId}-4`} productId={productId} /> */}
        </div>
      );
    } else {
      return (
        <div>
          <Overview key={`${productId}-1`} productId={productId} />
        </div>
      );
    }

  }

}

export default App;
