import React, { useState, useEffect } from 'react';
import SizeAndQuantitySelector from './SizeAndQuantitySelector.jsx';

const AddToCart = ({state, updateState}) => {

  const addToCartModal = () => {
    let sizeValue = document.getElementById('size').value;
    let quantityValue = document.getElementById('quantity').value;

    if (sizeValue === 'default' || quantityValue === 'default') {
      alert('You need to select a size and quantity first');
    }
  };

  return (
    <>
      {state !== undefined && (
        <div id='addToCart'>
          <SizeAndQuantitySelector state={state} updateState={updateState}/>
          <button onClick={addToCartModal} id='addToCartButton'>Add To Cart</button>
        </div>
      )}
    </>
  );
};

export default AddToCart;
