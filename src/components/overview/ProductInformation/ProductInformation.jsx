import React, { useState, useEffect } from 'react';
import AverageRating from './AverageRating.jsx';

const ProductInformation = ({state, updateState}) => {

  return (
    <>
      {state !== undefined && (
        <div id='productinfo'>
          <div id='rating'>
            <div id='star'><AverageRating state={state} updateState={updateState}/></div>
          </div>
          <div id='category'>[Category - {state.selectedProductCategory}]</div>
          <div id='productName'>{state.selectedProductName}</div>
          <div id='price'>{state.selectedProductDefaultPrice}</div>
        </div>
      )}
    </>
  );
};

export default ProductInformation;
