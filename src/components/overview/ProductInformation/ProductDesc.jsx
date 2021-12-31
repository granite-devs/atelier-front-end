import React, { useState, useEffect } from 'react';

const ProductDesc = ({state, updateState}) => {


  return (
    <>
      {state !== undefined && (
        <>
          <div id='slogan'>{state.selectedProductSlogan}</div>
          <div id='productDescription'>{state.selectedProductDesc}</div>
        </>
      )}
    </>
  );
};

export default ProductDesc;
