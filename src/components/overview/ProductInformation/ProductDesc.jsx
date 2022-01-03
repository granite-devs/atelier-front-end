import React, { useState, useEffect } from 'react';

const ProductDesc = ({state, updateState}) => {


  return (
    <>
      {state !== undefined && (
        <>
          <div id='productDesc'>
            <div id='slogan'>
              {state.selectedProductSlogan}
            </div>
            <div id='productDescription'>
              {state.selectedProductDesc}
            </div>
          </div>
          <div id='productFeature'>
            {state.selectedProductDetail.features.map((element) => {
              return <div>{`${element.feature}: ${element.value}`}</div>;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDesc;
