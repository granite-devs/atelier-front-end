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
    selectedProductFeature: [],
    currentStyle: {},
    mainImage: '',
    currentImgIndex: 0,
    isExpanded: false,
    rating: {},
    ratingSum: 0,
    currentSize: ''
  });

  useEffect (() => {
    if (productId) {
      let styleData = JSON.parse(window.localStorage.getItem(productId)).styles.results;
      let productData = JSON.parse(window.localStorage.getItem(productId)).details;
      let reviewData = JSON.parse(window.localStorage.getItem(productId)).reviews;

      updateState((preValues) => {
        return {
          ...preValues,
          selectedProductStyle: styleData,
          currentStyle: styleData[0],
          selectedStyleDefaultImages: styleData[0].photos,
          mainImage: styleData[0].photos[0].thumbnail_url,
          selectedProductDetail: productData,
          selectedProductCategory: productData.category,
          selectedProductDefaultPrice: `$${Math.round(productData.default_price)}`,
          selectedProductDesc: productData.description,
          selectedProductName: productData.name,
          selectedProductSlogan: productData.slogan,
          selectedProductFeature: productData.features,
          rating: reviewData.ratings
        };
      });
    }
  }, []);

  return (
    <>
      <div id='announce'><b>&nbsp;FREE SHIPPING&nbsp;+&nbsp;RETURNS,&nbsp; SAVE UP TO 30% ON SELECT ITEMS</b></div>
      <div id='overview'>
        <div id='overviewTop'>
          <ImageGallery state={state} updateState={updateState}/>
          <div id='productInformationSection'>
            <ProductInformation state={state} updateState={updateState}/>
            <StyleSelector state={state} updateState={updateState}/>
            <AddToCart state={state} updateState={updateState}/>
          </div>
        </div>
        <div id='overviewBottom'>
          <ProductDesc state={state} updateState={updateState}/>
        </div>
      </div>
    </>
  );
};


export default Overview;
