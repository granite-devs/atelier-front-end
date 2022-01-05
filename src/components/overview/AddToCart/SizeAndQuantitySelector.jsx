import React, { useState, useEffect } from 'react';

const SizeAndQuantitySelector = ({state, updateState}) => {
  const [ sizeAndQuantity, updateSizeAndQuantity ] = useState(null);
  const [ currentSize, updateCurrentSize ] = useState(null);
  const [ quantity, updateQuantity ] = useState([]);

  useEffect (() => {
    // added into the state as an object that has size key and quantity value.
    // the sizeAndQuanty would be changed when the user select the other style.

    //when the user change the style, it will display default size and quantity.
    document.getElementById('size').value = 'default';
    document.getElementById('quantity').value = 'default';

    if (state.currentStyle.skus !== undefined) {
      let currentStyleSkus = state.currentStyle.skus;
      let sizeAndQuantityObject = {};
      for (let key in currentStyleSkus) {
        sizeAndQuantityObject[state.currentStyle.skus[key].size] = state.currentStyle.skus[key].quantity;
      }
      updateSizeAndQuantity(sizeAndQuantityObject);
      updateState((preValues) => {
        return {...preValues, currentSize: ''};
      }); // to delete the stock availability
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
    updateState((preValues) => {
      return {...preValues, currentSize: selectedSize};
    });
  };

  return (
    <>
      <div id='quantityOption'>
        {state.currentSize !== '' && state.currentSize !== 'default' && (
          quantity.length > 9 ?
            <div id='enoughStock' style={{color: '#3aba2c'}}>
            In Stock
            </div> :
            <div id='lessThanTen' style={{color: '#f75d5d'}}>
            Only {quantity.length} available!
            </div>
        )}
      </div>
      <div id='sizeAndQuantitySelector'>
        <select onChange={updateSize} id='size'>
          <option id='SizeDefault' value='default' key='size'>Select Size</option>
          {sizeAndQuantity !== null && (
            Object.keys(sizeAndQuantity).map((element, index) => {
              return <option id={`size${element}`} key={index}>{element}</option>;
            })
          )}
        </select>
        <select id='quantity'>
          {quantity[0] !== undefined ?
            quantity.map((element, index) => {
              return <option id={`quantity${element}`} value={`quantity${element}`} key={index}>{element}</option>;
            }) :
            <option id='QuantityDefault' value='default' key='default'>-</option>
          }
        </select>
      </div>
    </>
  );
};

export default SizeAndQuantitySelector;
