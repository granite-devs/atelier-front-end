import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

const Related = ({ productId, updateAppProductId, addItemToOutfit,
  outfitItems, removeItemFromOutfit }) => {
  return (
    <div className='related-list'>
      <RelatedProductsList
        currentList={'related'}
        productId={productId}
        updateAppProductId={updateAppProductId} />
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
