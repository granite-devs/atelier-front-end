import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

const Related = ({ productId, updateAppProductId, addItemToOutfit, cachedProducts,
  outfitItems, removeItemFromOutfit, checkCache, fetchProductDetails }) => {
  return (
    <div className='related-module'>
      <RelatedProductsList
        currentList={'related'}
        productId={productId}
        updateAppProductId={updateAppProductId}
        checkCache={checkCache}
        fetchProductDetails={fetchProductDetails}
        cachedProducts={cachedProducts} />
      <YourOutfitList
        currentList={'yourOutfit'}
        productId={productId}
        checkCache={checkCache}
        updateAppProductId={updateAppProductId}
        addItemToOutfit={addItemToOutfit}
        outfitItems={outfitItems}
        removeItemFromOutfit={removeItemFromOutfit} />
    </div>
  );
}

export default Related;
