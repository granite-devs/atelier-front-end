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

    this.handleAddToOutfitClick = this.handleAddToOutfitClick.bind(this);
  }

  componentDidMount() {

  }

  handleAddToOutfitClick(productToAdd) {
    console.log(productToAdd);
    this.props.addItemToOutfit(productToAdd);
  }


  render() {
    const { productId, productCardId, updateAppProductId, outfitItems } = this.props;

    return (
      <>
        <h3>Your Outfit</h3>
        <div className='product-card-list'>
          <div className='product-card add-outfit-card'
            onClick={() => { this.handleAddToOutfitClick(productId) }}>
              ADD TO OUTFIT CARD </div>
          {outfitItems.map((outfitItemId, i) => {
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
