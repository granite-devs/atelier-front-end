import React, { useState, useEffect } from 'react';
import AverageRating from './AverageRating.jsx';

const ProductInformation = ({state, updateState}) => {

  return (
    <>
      {state !== undefined && (
        <div id='productinfo'>
          <div id='rating'>
            <div id='star'><AverageRating state={state} updateState={updateState}/></div>
            <div id='readReview'>Read all review</div>
          </div>
          <div id='productName'>
            <div id='category'>{state.selectedProductCategory}</div>
            {state.selectedProductName}
          </div>
          <div id='price'>{state.selectedProductDefaultPrice}</div>
        </div>
      )}
    </>
  );
};

export default ProductInformation;
