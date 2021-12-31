import React, { useState, useEffect } from 'react';
import App from '../../App.jsx';
import axios from 'axios';
import API_KEY from '../../config.js';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductInformation from './ProductInformation/ProductInformation.jsx';

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
    selectedProductDefaultStyle: {},
    selectedStyle: {},
    selectedStyleDefaultImages: [],
    mainImage: '',
    currentImgIndex: 0,
    isExpanded: false
  });

  const apiInstance = axios.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/',
    headers: { Authorization: API_KEY },
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
              selectedProductDefaultStyle: styleResult[0],
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
              selectedProductDefaultPrice: `$${result.data.default_price}`,
              selectedProductDesc: result.data.description,
              selectedProductName: result.data.name,
              selectedProductSlogan: result.data.slogan
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
    <div id='overviewTop'>
      <ImageGallery state={state} updateState={updateState}/>
      <ProductInformation state={state} updateState={updateState}/>
    </div>
    </>
  );

};


export default Overview;
