import React from 'react';
import App from '../../App.jsx';
import axios from 'axios';
import API_KEY from '../../config.js';
import ImageGallery from './ImageGallery/ImageGallery-index.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProductIdInfo: [],
      selectedStyle: []
    };

    this.handleToLoadProductDetail = this.handleToLoadProductDetail.bind(this);
  }

  componentDidMount() {
    this.handleToLoadProductDetail();
  }

  handleToLoadProductDetail () {
    let apiInstance = axios.create({
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/',
      headers: { Authorization: API_KEY },
    });

    if (this.props.productId) {
      const getAllProductData = () => apiInstance.get(`${this.props.productId}/styles`);
      getAllProductData()
        .then((result) => {
          let styleResult = result.data.results;
          this.setState({
            selectedProductIdInfo: styleResult,
            selectedStyle: styleResult[0] //default is the first style
          });
        })
        .catch ((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div>
        <ImageGallery selectedStyle={this.state.selectedStyle}/>
      </div>
    );
  }
}


export default Overview;
