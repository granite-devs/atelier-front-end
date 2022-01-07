import React, { useState, useEffect } from 'react';
import SizeAndQuantitySelector from './SizeAndQuantitySelector.jsx';

const AddToCart = ({state, updateState}) => {
  const [ toggleForModal, test ] = useState(false);

  const addToCartModal = (event) => {
    test(!toggleForModal);
  };

  useEffect (() => {
    let sizeValue = document.getElementById('size').value;
    let quantityValue = document.getElementById('quantity').value;

    if (toggleForModal) {
      if (sizeValue === 'default' || quantityValue === 'default') {
        document.getElementById('addToCartModalSelected').style.display = 'none';
      } else {
        document.getElementById('addToCartModalnotSelected').style.display = 'none';
      }
    }
  }, [toggleForModal]);

  return (
    <>
      <div id='addToCart'>
        <SizeAndQuantitySelector state={state} updateState={updateState}/>
        <button onClick={addToCartModal} id='addToCartButton' className='big-btn'>Add To Cart</button>
      </div>

      {toggleForModal && (
        <div id='addToCartModal'>
          <div id='addToCartModalOverlay'></div>
          <div id='addToCartModalContent'>
            <h2 style={{color: 'grey'}}>Hi 👋</h2>
            <p id='addToCartModalnotSelected'>
              Please select a size and quantity first.
            </p>
            <p id='addToCartModalSelected'>
              Item Added To Cart
            </p>
            <button id='close-cart-btn' className='big-btn' onClick={addToCartModal} > Close </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;
