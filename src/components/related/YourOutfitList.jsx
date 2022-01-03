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

  handleAddToOutfitClick(productToAdd) {
    this.props.addItemToOutfit(productToAdd);
  }

  render() {
    const { productId, productCardId, updateAppProductId,
      outfitItems, currentList, removeItemFromOutfit } = this.props;

    return (
      <>
        <h3>Your Outfit</h3>
        <div className='product-card-list'>
          <div className='product-card add-outfit-card'
            onClick={() => { this.handleAddToOutfitClick(productId) }}>
            <img className='add-outfit-icon' src='https://tinyurl.com/3hspumek'></img>
            <span className='add-outfit-text'>Add to Outfit</span>
          </div>
          {outfitItems.map((outfitItemId, i) => {
            return <ProductCard key={i}
              currentList={currentList}
              productId={productId}
              productCardId={outfitItemId}
              updateAppProductId={updateAppProductId}
              removeItemFromOutfit={removeItemFromOutfit} />
          })}
        </div>
      </>
    );
  }
}

export default YourOutfitList;
