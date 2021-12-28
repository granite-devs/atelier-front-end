import React, { useState, useEffect } from 'react';
import App from '../../App.jsx';
import axios from 'axios';
import API_KEY from '../../config.js';
import ImageGallery from './ImageGallery/ImageGallery-index.jsx';

const Overview = ({productId}) => {
  const [ selectedProductId, updateProductId ] = useState(productId);
  const [ allStyleItems, updateStyle ] = useState([]);
  const [ selectedStyle, updateSelectedStyle ] = useState([]);

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
          updateStyle(styleResult);
          updateSelectedStyle(styleResult[0]);
        })
        .catch ((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <ImageGallery selectedStyle={selectedStyle}/>
    </>
  );

};


export default Overview;
