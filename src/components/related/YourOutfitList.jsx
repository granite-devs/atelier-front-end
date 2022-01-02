import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';


class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outfitItems: [],
      initialRequestMade: false
    }

    this.addItemToOutfit = this.addItemToOutfit.bind(this);
  }

  componentDidMount() {

  }

  addItemToOutfit(productToAdd) {
    console.log('add to outfit clicked');
    const outfitItems = this.state.outfitItems;

    //check if item already exists
    if (!outfitItems.includes(productToAdd)) {
      this.setState({outfitItems: [...this.state.outfitItems, productToAdd]});
    }

  }


  render() {
    const { productId, productCardId, updateAppProductId} = this.props;
    console.log(productId);

    return (
      <>
        <h3>Your Outfit</h3>
        <div className='product-card-list'>
          <div className='product-card add-outfit-card'
            onClick={() => { this.addItemToOutfit(productId) }}>
              ADD TO OUTFIT CARD </div>
          {this.state.outfitItems.map((outfitItemId, i) => {
            return <ProductCard key={i}
                productId={productId}
                productCardId={outfitItemId}
                updateAppProductId={updateAppProductId} />
          })}
        </div>
      </>
    );
  }
}

export default YourOutfitList;
