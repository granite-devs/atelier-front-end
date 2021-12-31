import React, { useState, useEffect } from 'react';


const ProductInformation = ({state, updateState}) => {

  return (
    <>
      {state !== undefined && (
        <div id='productinfo'>
          <div id='rating'>
            <div id='star'>STAR</div>
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
