import { useSelector } from 'react-redux';
import { collectionsSelectors } from '../stores/slices/collections';

const useCollections = () => {
  const Collection = useSelector(collectionsSelectors.collection);
  const Collections = useSelector(collectionsSelectors.collections);
  const CollectionPhotos = useSelector(collectionsSelectors.collectionPhotos);
  const CollectionRelated = useSelector(collectionsSelectors.collectionRelated);

  const isLoadingCollection = useSelector(
    collectionsSelectors.isLoadingCollection,
  );
  const isLoadingCollections = useSelector(
    collectionsSelectors.isLoadingCollections,
  );
  const isLoadingCollectionPhotos = useSelector(
    collectionsSelectors.isLoadingCollectionPhotos,
  );
  const isLoadingCollectionRelated = useSelector(
    collectionsSelectors.isLoadingCollectionRelated,
  );

  return {
    Collection,
    Collections,
    CollectionPhotos,
    CollectionRelated,

    isLoadingCollection,
    isLoadingCollections,
    isLoadingCollectionPhotos,
    isLoadingCollectionRelated,
  };
};

export default useCollections;
