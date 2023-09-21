import { useSelector } from 'react-redux';
import { usersSelectors } from '../stores/slices/users';

const useUsers = () => {
  const userProfile = useSelector(usersSelectors.publicUser);
  const Photos = useSelector(usersSelectors.publicUserPhotos);
  const Likes = useSelector(usersSelectors.publicUserLikedPhotos);
  const Collections = useSelector(usersSelectors.publicUserCollectionPhotos);

  return {
    userProfile,
    Photos,
    Likes,
    Collections,
  };
};

export default useUsers;
