import { useSelector } from 'react-redux';
import { usersSelectors } from '../stores/slices/users';

const useUsers = () => {
  const userProfile = useSelector(usersSelectors.publicUser);
  const Photos = useSelector(usersSelectors.publicUserPhotos);
  const Likes = useSelector(usersSelectors.publicUserLikedPhotos);
  const Collections = useSelector(usersSelectors.publicUserCollectionPhotos);
  const CurrentUser = useSelector(usersSelectors.currentUser);
  const ListUsers = useSelector(usersSelectors.listUsers);

  return {
    userProfile,
    Photos,
    Likes,
    Collections,
    CurrentUser,
    ListUsers,
  };
};

export default useUsers;
