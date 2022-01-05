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
  }

  updateAppProductId(newProductId, productObject, productIdToCache) {
    const updatedCache = {...this.state.cachedProducts};
    updatedCache[productIdToCache || newProductId] = productObject;

    this.setState({
      productId: newProductId,
      cachedProducts: updatedCache
    }, () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  checkCache(productIdToCheck) {
    console.log(`checking cache for ${productIdToCheck}`);
    return this.state.cachedProducts[productIdToCheck];
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

  componentDidMount() {
    console.log('INITAL REQUEST');

    const intializationConfig = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products',
      headers: {
        Authorization: API_KEY,
      },
    };

    axios(intializationConfig)
      .then((response) => {
        this.setState({
          productId: response.data[0].id,
          initialRequestMade: true
        }); // sets the id of the first prodcut in the list as the init id
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log('APP RENDER------');


    const { productId, outfitItems, initialRequestMade } = this.state;

    // return (
    //   <div>
    //     <Overview key={`${productId}-1`} productId={productId} />
    //     <Related
    //       key={`${productId}-2`}
    //       productId={productId}
    //       checkCache={this.checkCache}
    //       updateAppProductId={this.updateAppProductId}
    //       addItemToOutfit={this.addItemToOutfit}
    //       removeItemFromOutfit={this.removeItemFromOutfit}
    //       outfitItems={outfitItems}
    //     />
    //     {/* <QuestionsAnswers key={`${productId}-3`} productId={productId} />
    //     <Reviews key={`${productId}-4`} productId={productId} /> */}
    //   </div>
    // );

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
