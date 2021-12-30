import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '...',
      name: '...',
      price: '...',
      sale: '...',
      initialRequestMade: false
    }
  }

  componentDidMount() {
    this.fetchProductInfo(this.props.productCardId);
  }

  fetchProductInfo (productIdToGet) {
    const { initialRequestMade } = this.state;

    if (!initialRequestMade) {
      this.setState({initialRequestMade: true});

      const infoRequestConfig = {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productIdToGet}`,
        headers: {Authorization: API_KEY}
      };

      axios(infoRequestConfig)
        .then((response) => {
          this.setState({name: response.data.name,
            category: response.data.category});
        })
        .catch((error) => {
          console.log('HTTP request to fetch product info failed');
        });
    }

  }

  render() {
    const { productCardId, updateAppProductId } = this.props;
    const { name, category } = this.state;

    return (
      <div className='product-card'
        onClick={() => { updateAppProductId(productCardId); }}>
        <h4 className='card-name'>{name}</h4>
        <p className='card-category'>{category}</p>
      </div>
    );
  }
}

export default ProductCard;
