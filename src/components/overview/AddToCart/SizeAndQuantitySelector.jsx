import React, { useState, useEffect } from 'react';

const SizeAndQuantitySelector = ({state, updateState}) => {
  const [ quantity, updateQuantity ] = useState([]);
  const [ size, updateSize ] = useState([]);

  useEffect (() => {
    if (state.currentStyle.skus !== undefined) {
      const currentStyleSkus = state.currentStyle.skus;
      for (const key in currentStyleSkus) {
        quantity.push(state.currentStyle.skus[key].quantity);
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
          hello
        </div>
      )}
    </>
  );
};

export default SizeAndQuantitySelector;
