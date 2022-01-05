import React, { useState, useEffect } from 'react';
import App from '../../App.jsx';
import axios from 'axios';
import API_KEY from '../../config.js';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductInformation from './ProductInformation/ProductInformation.jsx';
import ProductDesc from './ProductInformation/ProductDesc.jsx';
import SocialMedia from './ProductInformation/SocialMedia.jsx';
import StyleSelector from './StyleSelector/StyleSelector.jsx';
import AddToCart from './AddToCart/AddToCart.jsx';


const Overview = ({productId}) => {
  const [ selectedProductId, updateProductId ] = useState(productId);
  const [ state, updateState ] = useState({
    selectedProductDetail: {},
    selectedProductStyle: {},
    selectedProductCategory: '',
    selectedProductDefaultPrice: '',
    selectedProductDesc: '',
    selectedProductName: '',
    selectedProductSlogan: '',
    selectedProductStyle: {},
    selectedProductFeature: [],
    currentStyle: {},
    mainImage: '',
    currentImgIndex: 0,
    isExpanded: false,
    rating: {},
    ratingSum: 0,
    currentSize: ''
  });

  const apiInstance = axios.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/',
    headers: { Authorization: API_KEY },
  });

  const apiInstanceForReview = axios.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/meta',
    headers: { Authorization: API_KEY },
    params: {
      'product_id': productId
    }
  });

  useEffect (() => {
    if (selectedProductId) {
      //fetch styleDetail
      const getStyleData = () => apiInstance.get(`${selectedProductId}/styles`);
      getStyleData()
        .then((result) => {
          let styleResult = result.data.results;
          updateState((preValues) => {
            return {
              ...preValues,
              selectedProductStyle: styleResult,
              currentStyle: styleResult[0],
              selectedStyleDefaultImages: styleResult[0].photos,
              mainImage: styleResult[0].photos[0].url
            };
          });
        })
        .catch ((err) => {
          console.log(err);
        });

      //fetch productDetail
      const getAllProductData = () => apiInstance.get(`${selectedProductId}`);
      getAllProductData()
        .then((result) => {
          updateState((preValues) => {
            return {
              ...preValues,
              selectedProductDetail: result.data,
              selectedProductCategory: result.data.category,
              selectedProductDefaultPrice: `$${Math.round(result.data.default_price)}`,
              selectedProductDesc: result.data.description,
              selectedProductName: result.data.name,
              selectedProductSlogan: result.data.slogan,
              selectedProductFeature: result.data.features
            };
          });
        })
        .catch ((err) => {
          console.log(err);
        });

      //fetch reviewData
      const getReviewMetaData = () => apiInstanceForReview.get('');
      getReviewMetaData()
        .then((result) => {
          updateState((preValues) => {
            return {
              ...preValues,
              rating: result.data.ratings
            };
          });
        })
        .catch ((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      {state.currentStyle.name !== undefined ? (
        <div id='overview'>
          <div id='overviewTop'>
            <ImageGallery state={state} updateState={updateState}/>
            <div id='productInformationSection'>
              <ProductInformation state={state} updateState={updateState}/>
              <StyleSelector state={state} updateState={updateState}/>
              <AddToCart state={state} updateState={updateState}/>
              <SocialMedia/>
            </div>
          </div>
          <div id='overviewBottom'>
            <ProductDesc state={state} updateState={updateState}/>
          </div>
        </div>
      ) :
        <div id='loadingImage'>'loading'</div>
      }
    </>
  );
};


export default Overview;
