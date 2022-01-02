import React, { useState, useEffect } from 'react';
import AverageRating from './AverageRating.jsx';

const ProductInformation = ({state, updateState}) => {

  //change price color when it's on sale.
  useEffect (() => {
    document.getElementById('price').style.color = 'black';
    if (state.currentStyle.sale_price !== null) {
      document.getElementById('price').style.color = 'red';
    }
  }, [state]);

  return (
    <>
      {state !== undefined && (
        <div id='productinfo'>
          <div id='rating'>
            <div id='star'>
              <AverageRating state={state} updateState={updateState}/>
            </div>
          </div>
          <div id='category'>
            Category - [{state.selectedProductCategory}]
          </div>
          <div id='productName'>
            {state.selectedProductName}
          </div>
          <div id='price'>
            {(state.currentPrice && state.currentStyle.sale_price !== null) ?
              <b>{state.currentPrice}</b> :
              state.selectedProductDefaultPrice
            }
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInformation;
