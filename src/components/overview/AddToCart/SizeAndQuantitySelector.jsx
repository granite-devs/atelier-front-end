import React, { useState, useEffect } from 'react';

const SizeAndQuantitySelector = ({state, updateState}) => {
  const [ size, updateSize ] = useState([]);
  const [ quantity, updateQuantity ] = useState([]);

  useEffect (() => {
    // added into state as an array to use map function for rendering.
    if (state.currentStyle.skus !== undefined) {
      const currentStyleSkus = state.currentStyle.skus;
      for (const key in currentStyleSkus) {
        quantity.push(state.currentStyle.skus[key].quantity);
        quantity.sort((a, b) => { //sorting from samll quantity to large quantity
          return a - b;
        });
        updateQuantity(quantity);

        size.push(state.currentStyle.skus[key].size);
        updateSize(size);
      }
    }
  }, []);

  return (
    <>
      {state.currentStyle.skus !== undefined && (
        <div id='sizeAndQuantitySelector'>
          <select id='size'>
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
          </select>
        </div>
      )}
    </>
  );
};

export default SizeAndQuantitySelector;
