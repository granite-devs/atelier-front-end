import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';


class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIds: [],
      initialRequestMade: false,
      indexesToShow: [0, 1, 2, 3],
      showLeftArrow: false,
      showRightArrow: true
    }
  }

  componentDidMount() {
    this.computeIndexesToShow();
    this.fetchRelatedIds(this.props.productId);
  }

  fetchRelatedIds(productIdToGet) {
    const { initialRequestMade } = this.state;

    if (productIdToGet && !initialRequestMade) {
      this.setState({initialRequestMade: true});

      const relatedIdsRequestConfig = {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productIdToGet}/related`,
        headers: {Authorization: API_KEY}
      };

      axios(relatedIdsRequestConfig)
        .then((response) => {
          this.setState({relatedIds: response.data});
        })
        .catch((error) => {
          console.log('HTTP request to fetch related product IDs failed');
        });
    }
  }

  computeIndexesToShow() {
    const arrowsWidth = document.getElementsByClassName('related-arrow')[0].offsetWidth * 2;
    const listWidth = document.getElementById('related-list').offsetWidth;
    const cardWidth = document.getElementsByClassName('product-card')[0].offsetWidth + 20;
    const visibleWidth = listWidth - arrowsWidth;

    const numberOfCardsToShow = Math.floor(visibleWidth / cardWidth);
    let indexesArray = [0];

    for (let i = 1; i < numberOfCardsToShow; i++) {
      indexesArray.push(i);
    }

    this.setState({
      indexesToShow: indexesArray
    });
  }

  handleLeftArrowClick() {
    console.log('handle right arrow click fired');
    const { indexesToShow, relatedIds } = this.state;
    let { showLeftArrow, showRightArrow } = this.state;

    if (indexesToShow[0] - 1 === 0) {
      showLeftArrow = false;
    }

    if (indexesToShow[indexesToShow.length - 1] < relatedIds.length) {
      showRightArrow = true;
    }

    this.setState({
      showLeftArrow: showLeftArrow,
      showRightArrow: showRightArrow,
      indexesToShow: indexesToShow.map(index => { return index - 1; })
    });
  }

  handleRightArrowClick() {
    console.log('handle right arrow click fired');
    const { indexesToShow, relatedIds } = this.state;
    let { showLeftArrow, showRightArrow } = this.state;

    if (indexesToShow[0] + 1 > 0) {
      showLeftArrow = true;
    }

    if (indexesToShow[indexesToShow.length - 1] + 2 === relatedIds.length) {
      showRightArrow = false;
    }

    this.setState({
      showLeftArrow: showLeftArrow,
      showRightArrow: showRightArrow,
      indexesToShow: indexesToShow.map(index => { return index + 1; })
    });

  }

  render() {
    const { productId, productCardId, updateAppProductId,
      currentList, removeItemFromOutfit } = this.props;
    const { showLeftArrow, indexesToShow, relatedIds } = this.state;
    let { showRightArrow } = this.state;

    if (relatedIds.length <= indexesToShow.length) {
      showRightArrow = false;
    }

    return (
      <>
        <h3>Related Products</h3>
        <div id='related-list'>
          <div className='related-arrow'>
            <img className={showLeftArrow ? 'related-left-arrow' : 'related-left-arrow hide'}
              src='https://i.ibb.co/r0GN44X/image.png'
              onClick={() => { this.handleLeftArrowClick() }}></img>
          </div>
          <div className='product-card-list related-cards'>
            {this.state.relatedIds.map((relatedId, i) => {
              return <ProductCard key={i}
                hidden={!indexesToShow.includes(i)}
                currentList={currentList}
                productId={productId}
                productCardId={relatedId}
                updateAppProductId={updateAppProductId} />
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

export default RelatedProductsList;
