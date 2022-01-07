import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';


class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfCardsToShow: 0,
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
    const windowWidth = window.innerWidth;
    let listWidth = 960;
    const cardWidth = 178 + 10;
    const arrowsWidth = 31 * 2;
    const addCardWidth = 114 + 10;
    if (windowWidth <= 980) { listWidth = (windowWidth * .85) - 5; }
    if (windowWidth <= 600) { listWidth = windowWidth - 8; }

    const visibleWidth = listWidth - addCardWidth - arrowsWidth;
    const numberOfCardsToShow = Math.floor(visibleWidth / cardWidth);

    const indexesArray = this.buildIndexesToShow(numberOfCardsToShow);

    this.setState({
      numberOfCardsToShow: numberOfCardsToShow,
      indexesToShow: indexesArray
    });

    return numberOfCardsToShow;
  }

  buildIndexesToShow(numberOfCards) {
    let indexesArray = [0];

    for (let i = 1; i < numberOfCards; i++) {
      indexesArray.push(i);
    }
    return indexesArray;
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
    const { indexesToShow } = this.state;

    this.props.addItemToOutfit(productToAdd);
    const numberOfCardsToShow = this.computeIndexesToShow();
    const newIndexesToShow = this.buildIndexesToShow(numberOfCardsToShow);

    this.setState({
      indexesToShow: newIndexesToShow,
      showLeftArrow: false,
      showRightArrow: true
    });
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
              src='./images/leftarrow.png'
              onClick={() => { this.handleLeftArrowClick() }}></img>
          </div>

          <div className='product-card-list'>
          <div className='product-card add-outfit-card'
            onClick={() => { this.handleAddToOutfitClick(productId) }}>
            <img className='add-outfit-icon' src='./images/plussign.png'></img>
            <span className='add-outfit-text'>Add to Outfit</span>
          </div>
            {outfitItems.map((outfitItemId, i) => {
              return <ProductCard key={i}
                hidden={!indexesToShow.includes(i)}
                currentList={currentList}
                productId={productId}
                productCardId={outfitItemId}
                updateAppProductId={updateAppProductId}
                removeItemFromOutfit={removeItemFromOutfit}
                cardData={JSON.parse(window.localStorage.getItem(outfitItemId))}
                currentProductData={JSON.parse(window.localStorage.getItem(productId))} />
            })}
          </div>

          <div className='related-arrow'>
            <img className={showRightArrow ? 'related-right-arrow' : 'related-right-arrow hide'}
              src='./images/rightarrow.png'
              onClick={() => { this.handleRightArrowClick() }}></img>
          </div>
        </div>
      </>
    );
  }
}

export default YourOutfitList;
