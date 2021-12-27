import RelatedProductsList from './RelatedProductsList.jsx';

const Related = (props) => {
  const { productId, updateAppProductId } = this.props;

  return (
    <div>
      <RelatedProductsList
        productId={productId}
        updateAppProductId={updateAppProductId} />
    </div>
  );
}

export default Related;
