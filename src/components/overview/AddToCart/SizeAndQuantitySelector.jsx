import React, { useState, useEffect } from 'react';

const SizeAndQuantitySelector = ({state, updateState}) => {
  const [ sizeAndQuantity, updateSizeAndQuantity ] = useState([]);
  const [ quantity, updateQuantity ] = useState([]);

  useEffect (() => {
    // added into the state as an object that has size key and quantity value.
    // the sizeAndQuanty would be changed when the user select the other style.
    if (state.currentStyle.skus !== undefined) {
      let currentStyleSkus = state.currentStyle.skus;
      let currentStyleSkusArr = [];
      for (let key in currentStyleSkus) {
        let sizeAndQuantityObject = {};
        sizeAndQuantityObject[state.currentStyle.skus[key].size] = state.currentStyle.skus[key].quantity;

        currentStyleSkusArr.push(sizeAndQuantityObject);
      }
      updateSizeAndQuantity(currentStyleSkusArr);
    }
  }, [state.currentStyle]);

  return (
    <>
      {state.currentStyle.skus !== undefined && (
        <div id='sizeAndQuantitySelector'>
          {/* <select id='size'>
            <option id='default' key='10'>Select Size</option>;
            {size.map((element, idx) => {
              return <option id={`size${element}`} key={idx}>{element}</option>;
            })}
          </select>
          <select id='quantity'>
            <option id='default' key='10'>Quantity</option>;
            {quantity.map((element, idx) => {
              return <option id={`quantity${element}`} key={idx}>{element}</option>;
            })}
          </select> */}
        </div>
      )}
    </>
  );
};

export default SizeAndQuantitySelector;
