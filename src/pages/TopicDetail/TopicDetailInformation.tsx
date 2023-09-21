import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ITopic } from '../../interfaces/topic';
import { getWindowWidth } from '../../utils';

interface Props {
  topic?: ITopic | null;
  showLoading?: boolean;
}

const TopicDetailInformation: React.FC<Props> = ({ topic, showLoading }) => {
  const showLoadingTopicInformation = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        paddingTop={16}
        paddingBottom={16}
        flexDirection="row"
        alignItems="center">
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={150} height={32} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={getWindowWidth(80)}
            height={14}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={getWindowWidth(80)}
            height={14}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={getWindowWidth(100)}
            height={10}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={getWindowWidth(100)}
            height={10}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={getWindowWidth(100)}
            height={10}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={getWindowWidth(100)}
            height={10}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  const renderTopicInformation = () => (
    <View>
      <Text style={styles.topicTitle}>{topic?.title}</Text>
      <HTMLView value={topic?.description} stylesheet={styles} />
    </View>
  );

  return showLoading ? showLoadingTopicInformation() : renderTopicInformation();
};

const styles = StyleSheet.create({
  topicTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },
  a: {
    fontSize: 15,
    fontWeight: '400',
    color: '#767676',
    textDecorationLine: 'underline',
  },
});
export default TopicDetailInformation;
