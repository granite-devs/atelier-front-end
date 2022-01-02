import React, { useState, useEffect } from 'react';

const SizeAndQuantitySelector = ({state, updateState}) => {
  const [ sizeAndQuantity, updateSizeAndQuantity ] = useState({});
  const [ currentSize, updateCurrentSize ] = useState(null);
  const [ quantity, updateQuantity ] = useState([]);

  useEffect (() => {
    // added into the state as an object that has size key and quantity value.
    // the sizeAndQuanty would be changed when the user select the other style.
    if (state.currentStyle.skus !== undefined) {
      let currentStyleSkus = state.currentStyle.skus;
      let sizeAndQuantityObject = {};
      for (let key in currentStyleSkus) {
        sizeAndQuantityObject[state.currentStyle.skus[key].size] = state.currentStyle.skus[key].quantity;
      }
      updateSizeAndQuantity(sizeAndQuantityObject);
    }
  }, [state.currentStyle]);

  useEffect (() => {
    if (currentSize !== null) {
      let quantityAvailable = sizeAndQuantity[currentSize];
      let arrayForQuantity = [];
      for (let i = 1; i <= quantityAvailable; i++) {
        arrayForQuantity.push(i);
      }

      updateQuantity(arrayForQuantity);
    }
  }, [currentSize]);

  const updateSize = (event) => {
    let selectedSize = event.target.value;
    updateCurrentSize(selectedSize);
  };

  return (
    <>
      {state.currentStyle.skus !== undefined && (
        <div id='sizeAndQuantitySelector'>
          <select onChange={updateSize} id='size'>
            <option id='default' key='size'>Select Size</option>
            {Object.keys(sizeAndQuantity).map((element, idx) => {
              return <option id={`size${element}`} key={idx}>{element}</option>;
            })}
          </select>
          <select id='quantity'>
            {quantity[0] !== undefined ?
              quantity.map((element, idx) => {
                return <option id={`quantity${element}`} key={idx}>{element}</option>;
              }) :
              <option id='default' key='default'>-</option>
            }
          </select>
          {quantity[0] !== undefined && (
            quantity.length > 9 ?
              <div id='enoughStock' style={{color: '#3aba2c'}}>
              In Stock
              </div> :
              <div id='lessThanTen' style={{color: '#f75d5d'}}>
              Only {quantity.length} available!
              </div>
          )}
        </div>
      )}
    </>
  );
};

export default SizeAndQuantitySelector;
