import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

const Related = ({ productId, updateAppProductId, addItemToOutfit, cachedProducts,
  outfitItems, removeItemFromOutfit, fetchProductDetails }) => {
  return (
    <div className='related-module'>
      <RelatedProductsList
        currentList={'related'}
        productId={productId}
        updateAppProductId={updateAppProductId}
        fetchProductDetails={fetchProductDetails}
        cachedProducts={cachedProducts} />
      <YourOutfitList
        currentList={'yourOutfit'}
        productId={productId}
        updateAppProductId={updateAppProductId}
        addItemToOutfit={addItemToOutfit}
        outfitItems={outfitItems}
        removeItemFromOutfit={removeItemFromOutfit} />
    </div>
  );
}

export default Related;
