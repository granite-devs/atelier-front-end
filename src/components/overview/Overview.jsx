import React, { useState, useEffect } from 'react';
import App from '../../App.jsx';
import axios from 'axios';
import API_KEY from '../../config.js';
import ImageGallery from './ImageGallery/ImageGallery.jsx';

const Overview = ({productId}) => {
  const [ selectedProductId, updateProductId ] = useState(productId);
  const [ state, updateState ] = useState({
    productDetailById: {},
    productStyleById: {},
    selectedStyle: {},
    styleImages: [],
    mainImage: 0,
    currentImgIndex: 0,
    expanded: false
  });

  const apiInstance = axios.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/',
    headers: { Authorization: API_KEY },
  });

  useEffect (() => {
    if (selectedProductId) {
      const getAllProductData = () => apiInstance.get(`${selectedProductId}/styles`);
      getAllProductData()
        .then((result) => {
          let styleResult = result.data.results;
          updateState((preValues) => {
            return {
              ...preValues,
              productStyleById: styleResult,
              selectedStyle: styleResult[0],
              styleImages: styleResult[0].photos,
              mainImage: styleResult[0].photos[0].url
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
      <ImageGallery state={state} updateState={updateState}/>
    </>
  );

};


export default Overview;
