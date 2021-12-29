import React from 'react';

const ProductCard = ({ productCardId, updateAppProductId }) => {
  return (
    <div className='product-card'
      onClick={() => {
        console.log('clicked! ', updateAppProductId)
        updateAppProductId(productCardId);
      }}>
      <p>
        Product Card for Product Id {productCardId};
      </p>
    </div>
  );
}

export default ProductCard;
