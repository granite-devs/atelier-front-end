import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

const Related = ({ productId, updateAppProductId }) => {
  return (
    <div className='related-list'>
      <RelatedProductsList
        productId={productId}
        updateAppProductId={updateAppProductId} />
      <YourOutfitList
        productId={productId}
        updateAppProductId={updateAppProductId}/>
    </div>
  );
}

export default Related;
