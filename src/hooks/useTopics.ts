import { useSelector } from 'react-redux';
import { topicsSelectors } from '../stores/slices/topics';

const useTopics = () => {
  const Topics = useSelector(topicsSelectors.topics);
  const isLoadingTopics = useSelector(topicsSelectors.isLoadingTopics);

  const Topic = useSelector(topicsSelectors.topic);
  const TopicPhotos = useSelector(topicsSelectors.topicPhotos);
  const isLoadingTopic = useSelector(topicsSelectors.isLoadingTopic);
  const isLoadingTopicPhotos = useSelector(
    topicsSelectors.isLoadingTopicPhotos,
  );

  return {
    Topics,
    isLoadingTopics,
    Topic,
    isLoadingTopic,
    TopicPhotos,
    isLoadingTopicPhotos,
  };
};

export default useTopics;
