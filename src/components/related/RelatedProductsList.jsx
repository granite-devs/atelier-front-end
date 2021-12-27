import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';


class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIds: []
    }

    this.getRelatedIds = this.getRelatedIds.bind(this);
  }

  componentDidMount() {
    this.getRelatedIds(this.props.productId)
  }

  getRelatedIds(productId) {
    var relatedIdsRequestConfig = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productId}/related`,
      headers: {
        'Authorization': API_KEY
      }
    };

    axios(relatedIdsRequestConfig)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className=''>
        {this.state.relatedIds.map(relatedId => {
          return <ProductCard />
        })}
      </div>
    );
  }
}

export default RelatedProductsList;
