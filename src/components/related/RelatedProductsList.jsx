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

  componentDidUpdate() {
    console.log('relatedIds state: ', this.state.relatedIds);

      this.getRelatedIds(this.props.productId);
  }

  getRelatedIds(productIdToGet) {
    var relatedIdsRequestConfig = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productIdToGet}/related`,
      headers: {
        'Authorization': API_KEY
      }
    };

    axios(relatedIdsRequestConfig)
    .then((response) => {
      console.log('successful GET')
      if (this.state.relatedIds.toString() !== response.data.toString()) {
        console.log('setting state');
        this.setState({relatedIds: response.data});
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className=''>
        {this.state.relatedIds.map((relatedId, i) => {
          //return <ProductCard key={i} />
          return relatedId + ' ';
        })}
      </div>
    );
  }
}

export default RelatedProductsList;
