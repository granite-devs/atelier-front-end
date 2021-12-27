import RelatedProductsList from './RelatedProductsList.jsx';

const Related = ({ productId, updateAppProductId }) => {

  return (
    <div>
      <RelatedProductsList
        productId={productId}
        updateAppProductId={updateAppProductId} />
    </div>
  );
}

export default Related;
