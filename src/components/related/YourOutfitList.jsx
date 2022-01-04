import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';


class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialRequestMade: false,
      indexesToShow: [0],
      showLeftArrow: false,
      showRightArrow: true
    }

    this.handleAddToOutfitClick = this.handleAddToOutfitClick.bind(this);
  }

  componentDidMount() {
    this.computeIndexesToShow();
  }

  computeIndexesToShow() {
    const arrowsWidth = document.getElementsByClassName('related-arrow')[0].offsetWidth * 2;
    const listWidth = document.getElementById('outfit-list').offsetWidth;
    const cardWidth = document.getElementsByClassName('product-card')[0].offsetWidth + 20;
    const addCardWidth = document.getElementsByClassName('add-outfit-card')[0].offsetWidth + 10;
    const visibleWidth = addCardWidth + listWidth - arrowsWidth;

    const numberOfCardsToShow = Math.floor(visibleWidth / cardWidth);
    let indexesArray = [0];

    for (let i = 1; i < numberOfCardsToShow - 1; i++) {
      indexesArray.push(i);
    }

    this.setState({
      indexesToShow: indexesArray
    });
  }

  handleLeftArrowClick() {
    const { indexesToShow } = this.state;
    const { outfitItems } = this.props;
    let { showLeftArrow, showRightArrow } = this.state;

    if (indexesToShow[0] - 1 === 0) {
      showLeftArrow = false;
    }

    if (indexesToShow[indexesToShow.length - 1] < outfitItems.length) {
      showRightArrow = true;
    }

    this.setState({
      showLeftArrow: showLeftArrow,
      showRightArrow: showRightArrow,
      indexesToShow: indexesToShow.map(index => { return index - 1; })
    });
  }

  handleRightArrowClick() {
    const { indexesToShow } = this.state;
    const { outfitItems } = this.props;
    let { showLeftArrow, showRightArrow } = this.state;

    if (indexesToShow[0] + 1 > 0) {
      showLeftArrow = true;
    }

    if (indexesToShow[indexesToShow.length - 1] + 2 === outfitItems.length) {
      showRightArrow = false;
    }

    this.setState({
      showLeftArrow: showLeftArrow,
      showRightArrow: showRightArrow,
      indexesToShow: indexesToShow.map(index => { return index + 1; })
    });

  }

  handleAddToOutfitClick(productToAdd) {
    this.props.addItemToOutfit(productToAdd);
    this.computeIndexesToShow();
  }

  render() {
    const { productId, productCardId, updateAppProductId,
      outfitItems, currentList, removeItemFromOutfit } = this.props;

    const { showLeftArrow, indexesToShow } = this.state;
    let { showRightArrow } = this.state;

    if (outfitItems.length <= indexesToShow.length) {
      showRightArrow = false;
    }

    return (
      <>
        <h3>Your Outfit</h3>
        <div id='outfit-list'>
        <div className='related-arrow'>
          <img className={showLeftArrow ? 'related-left-arrow' : 'related-left-arrow hide'}
              src='https://i.ibb.co/r0GN44X/image.png'
              onClick={() => { this.handleLeftArrowClick() }}></img>
          </div>

          <div className='product-card-list'>
          <div className='product-card add-outfit-card'
            onClick={() => { this.handleAddToOutfitClick(productId) }}>
            <img className='add-outfit-icon' src='https://tinyurl.com/3hspumek'></img>
            <span className='add-outfit-text'>Add to Outfit</span>
          </div>
            {outfitItems.map((outfitItemId, i) => {
              return <ProductCard key={i}
                hidden={!indexesToShow.includes(i)}
                currentList={currentList}
                productId={productId}
                productCardId={outfitItemId}
                updateAppProductId={updateAppProductId}
                removeItemFromOutfit={removeItemFromOutfit} />
            })}
          </div>

          <div className='related-arrow'>
            <img className={showRightArrow ? 'related-right-arrow' : 'related-right-arrow hide'}
              src='https://i.ibb.co/k3GTgnr/arrow-icon-1177.png'
              onClick={() => { this.handleRightArrowClick() }}></img>
          </div>
        </div>
      </>
    );
  }
}

export default YourOutfitList;
