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
      initialRequestMade: false
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

  render() {
    return (
      <>
        <h3>Related Products</h3>
        <div className='product-card-list'>
        {this.state.relatedIds.map((relatedId, i) => {
          return <>
            <ProductCard key={i}
              productCardId={relatedId}
              updateAppProductId={this.props.updateAppProductId} />

            <CompareModal features={'fixthis'}
            displayModal={'fixthis'} />
          </>
        })}
        </div>
      </>
    );
  }
}

export default RelatedProductsList;
