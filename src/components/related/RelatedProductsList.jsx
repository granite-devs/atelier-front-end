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

    this.fetchRelatedIds = this.fetchRelatedIds.bind(this);
  }

  componentDidMount() {
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

  handleLeftArrowClick() {
    console.log('handle right arrow click fired');
    const { indexesToShow, relatedIds } = this.state;
    let { showLeftArrow, showRightArrow } = this.state;

    if (indexesToShow[0] - 1 === 0) {
      showLeftArrow = false;
    }

    if (indexesToShow[indexesToShow.length - 1] - 2 < relatedIds.length) {
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
    const { showLeftArrow, showRightArrow, indexesToShow } = this.state;

    return (
      <>
        <h3>Related Products</h3>
        <div id='related-list'>
          <div className='related-arrow'
            onClick={() => { this.handleLeftArrowClick() }}>
            <img className={showLeftArrow ? 'related-left-arrow' : 'related-left-arrow hide'}
              src='https://i.ibb.co/r0GN44X/image.png'></img>
          </div>
          <div className='product-card-list'>
            {this.state.relatedIds.map((relatedId, i) => {
              return <ProductCard key={i}
                hidden={!indexesToShow.includes(i)}
                currentList={currentList}
                productId={productId}
                productCardId={relatedId}
                updateAppProductId={updateAppProductId} />
            })}
          </div>
          <div className={showRightArrow ? 'related-right-arrow' : 'related-right-arrow hide'}
            onClick={() => { this.handleRightArrowClick() }}>
            <img className='related-right-arrow'
              src='https://i.ibb.co/k3GTgnr/arrow-icon-1177.png'></img>
          </div>
        </div>
      </>
    );
  }
}

export default RelatedProductsList;
