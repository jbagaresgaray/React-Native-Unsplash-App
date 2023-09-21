import { useSelector } from 'react-redux';
import { photosSelectors } from '../stores/slices/photos';

const usePhotos = () => {
  const Photos = useSelector(photosSelectors.photos);
  const isLoadingPhotos = useSelector(photosSelectors.isLoadingPhotos);

  return {
    Photos,
    isLoadingPhotos,
  };
};

export default usePhotos;
