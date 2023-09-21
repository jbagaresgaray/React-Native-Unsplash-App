import { useSelector } from 'react-redux';
import { topicsSelectors } from '../stores/slices/topics';

const useTopics = () => {
  const Topics = useSelector(topicsSelectors.topics);
  const isLoadingTopics = useSelector(topicsSelectors.isLoadingTopics);

  return {
    Topics,
    isLoadingTopics
  };
};

export default useTopics;
