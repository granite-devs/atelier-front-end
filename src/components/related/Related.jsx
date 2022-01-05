import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

const Related = ({ productId, updateAppProductId, addItemToOutfit,
  outfitItems, removeItemFromOutfit, checkCache }) => {
  return (
    <div className='related-module'>
      <RelatedProductsList
        currentList={'related'}
        productId={productId}
        updateAppProductId={updateAppProductId}
        checkCache={checkCache} />
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
