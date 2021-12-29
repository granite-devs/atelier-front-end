import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';
import ProductCard from './ProductCard.jsx';


class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIds: []
    }

    this.fetchRelatedIds = this.fetchRelatedIds.bind(this);
  }

  componentDidMount() {
    this.fetchRelatedIds(this.props.productId);
  }

  fetchRelatedIds(productIdToGet = 39333) {
    if (productIdToGet === null) productIdToGet = 39333;

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
          console.log(error);
        });
  }

  render() {
    return (
      <div className='related-list'>
        {this.state.relatedIds.map((relatedId, i) => {
          return <ProductCard key={i} productCardId={relatedId} />
        })}
      </div>
    );
  }
}

export default RelatedProductsList;
