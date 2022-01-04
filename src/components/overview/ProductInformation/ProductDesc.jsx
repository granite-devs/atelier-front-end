import React, { useState, useEffect } from 'react';

const ProductDesc = ({state, updateState}) => {

  let productFeature;
  if (state.selectedProductFeature) {
    productFeature = state.selectedProductFeature.map((element, index) => {
      return <div key={index} style={{marginBottom: '2px'}}>{`- ${element.feature}: ${element.value}`}</div>;
    });
  }

  return (
    <>
      <div id='productDesc'>
        <div id='slogan'>
          {state.selectedProductSlogan}
        </div>
        <div id='productDescription'>
          {state.selectedProductDesc}
        </div>
      </div>
      <div id='productFeature'>
        {productFeature}
      </div>
    </>
  );
};

export default ProductDesc;
