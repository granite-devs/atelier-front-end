import React, { useState, useEffect } from 'react';
import SizeAndQuantitySelector from './SizeAndQuantitySelector.jsx';

const AddToCart = ({state, updateState}) => {


  return (
    <>
      {state !== undefined && (
        <div id='addToCart'>
          <SizeAndQuantitySelector state={state} updateState={updateState}/>
          <button id='addToCartButton'>Add To Cart</button>
        </div>
      )}
    </>
  );
};

export default AddToCart;
