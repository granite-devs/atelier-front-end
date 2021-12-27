import React, { useState, useEffect } from 'react';
import App from '../../App.jsx';
import axios from 'axios';
import API_KEY from '../../config.js';

const Overview = ({productId}) => {
  const [state, updateState] = useState({
    productById: productId
  });

  const apiInstance = axios.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/',
    headers: { Authorization: API_KEY },
  });

  useEffect (() => {
    console.log(productId); // -> null
    console.log(state.productById); // -> null
    const getAllProductData = () => apiInstance.get(`${state.productById}/styles`);
    getAllProductData()
      .then((result) => {
        console.log(result.data);
      });
  }, []);

  return (
    <>
      <h1>
        Hello {productId}
      </h1>
    </>
  );

};


export default Overview;
