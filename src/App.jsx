import React from 'react';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import QuestionsAnswers from './components/questions/QuestionsAnswers.jsx';
import Related from './components/related/Related.jsx';

import API_KEY from './config.js';

// window.localStorage.clear(); //TODO: delete!!!

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 39333,
      outfitItems: [],
      initialRequestMade: false,
      renderer: 0
    };
    this.updateAppProductId = this.updateAppProductId.bind(this);
    this.addItemToOutfit = this.addItemToOutfit.bind(this);
    this.removeItemFromOutfit = this.removeItemFromOutfit.bind(this);
    this.fetchProductDetails = this.fetchProductDetails.bind(this);
  }

  componentDidMount() {
    const intializationConfig = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products',
      headers: {
        Authorization: API_KEY,
      },
    };

    axios(intializationConfig)
      .then((response) => {
        const newProductId = response.data[0].id;
        const cachedProduct = JSON.parse(window.localStorage.getItem(newProductId));

        if (cachedProduct) {
          this.setState({ //do not fetch info if product exists in cache
            productId: newProductId
          });
        } else {
          this.setState({ // sets the id of the first product in the list as the init id
            productId: newProductId,
            initialRequestMade: true
          }, () => {
            this.fetchProductDetails(newProductId);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateAppProductId(newProductId, productObject) {
    const productIsCached = window.localStorage.getItem(newProductId);
    const updateProductId = newProductId !== this.state.productId;

    if (!productIsCached) {
      window.localStorage.setItem(newProductId, JSON.stringify(productObject));
    }

    if (updateProductId) {
      this.setState({
        productId: newProductId
      }, () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  fetchProductDetails(productIdToGet) {
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
        };

        window.localStorage.setItem(productIdToGet, JSON.stringify(productObjectToCache));
        this.setState({ renderer: Math.random() });
      }))
      .catch(errors => {
        console.log(errors);
      });
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
    const { productId, outfitItems, initialRequestMade, renderer } = this.state;

    return (
      <>
        {window.localStorage.length > 0 && (
          <div>
            <div id='navBar'>
              <div id='logo'>LOGO</div>
            </div>
            <div id='componentWrapper'>
              <div className='components'>
                <Overview key={`${productId}-1`} productId={productId} />
                <Related
                  key={`${productId}-2`}
                  productId={productId}
                  updateAppProductId={this.updateAppProductId}
                  addItemToOutfit={this.addItemToOutfit}
                  removeItemFromOutfit={this.removeItemFromOutfit}
                  outfitItems={outfitItems}
                  fetchProductDetails={this.fetchProductDetails}
                  renderer={renderer}
                />
                <QuestionsAnswers key={`${productId}-3`} productId={productId} />
                <Reviews key={`${productId}-4`} productId={productId} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;
