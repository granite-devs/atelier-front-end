import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

const Related = ({ productId, updateAppProductId, addItemToOutfit, outfitItems }) => {
  return (
    <div className='related-list'>
      <RelatedProductsList
        productId={productId}
        updateAppProductId={updateAppProductId} />
      <YourOutfitList
        productId={productId}
        updateAppProductId={updateAppProductId}
        addItemToOutfit={addItemToOutfit}
        outfitItems={outfitItems} />
    </div>
  );
}

export default Related;
