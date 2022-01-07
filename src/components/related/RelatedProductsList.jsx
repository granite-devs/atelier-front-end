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
      indexesToShow: [0, 1, 2],
      showLeftArrow: false,
      showRightArrow: true
    }
  }

  componentDidMount() {
    const { relatedIds } = this.state.relatedIds;

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
            const relatedIds = response.data;

            this.setState({relatedIds: response.data});

              relatedIds.forEach(relatedId => {
                if (!window.localStorage.getItem(relatedId)) {
                  this.props.fetchProductDetails(relatedId);
                }
              })

          })
          .catch((error) => {
            console.log('HTTP request to fetch related product IDs failed');
          });
      }
  }

  computeIndexesToShow() {
    const windowWidth = window.innerWidth;
    let listWidth = 960;
    const cardWidth = 178 + 10;
    const arrowsWidth = 31 * 2;
    if (windowWidth <= 980) { listWidth = (windowWidth * .85) - 5; }
    if (windowWidth <= 600) { listWidth = windowWidth - 8; }

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

    let productCard = null;

    if (window.localStorage.length > 0) {
      productCard = <div className='product-card-list'>
            {this.state.relatedIds.map((relatedId, i) => {
              return <ProductCard key={i}
                hidden={!indexesToShow.includes(i)}
                currentList={currentList}
                productId={productId}
                productCardId={relatedId}
                updateAppProductId={updateAppProductId}
                cardData={JSON.parse(window.localStorage.getItem(relatedId))}
                currentProductData={JSON.parse(window.localStorage.getItem(productId))} />
            })}
      </div>
    }

    return (
      <>
        <h3>Related Products</h3>
        <div id='related-list'>
          <div className='related-arrow'>
            <img className={showLeftArrow ? 'related-left-arrow' : 'related-left-arrow hide'}
              src='./images/leftarrow.png'
              alt='Left facing arrow'
              onClick={() => { this.handleLeftArrowClick() }}></img>
          </div>
          {productCard}
          <div className='related-arrow'>
            <img className={showRightArrow ? 'related-right-arrow' : 'related-right-arrow hide'}
              src='./images/rightarrow.png'
              alt='Right facing arrow'
              onClick={() => { this.handleRightArrowClick() }}></img>
          </div>
        </div>
      </>
    );
  }
}

export default RelatedProductsList;
