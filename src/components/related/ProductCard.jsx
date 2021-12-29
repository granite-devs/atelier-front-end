import React from 'react';

const ProductCard = ({ productCardId }) => {
  return (
    <div className='product-card'>
      <p>
        Product Card for Product Id {productCardId};
      </p>
    </div>
  );
}

export default ProductCard;
