import React, { useState, useEffect } from 'react';

const ProductInformation = ({state, updateState}) => {

  return (
    <>
      {state !== undefined && (
        <div id='productinfo'>
          <div id='productName'>{state.selectedProductName}</div>
          <div id='price'>{state.selectedProductDefaultPrice}</div>
        </div>
      )}
    </>
  );
};


export default ProductInformation;
