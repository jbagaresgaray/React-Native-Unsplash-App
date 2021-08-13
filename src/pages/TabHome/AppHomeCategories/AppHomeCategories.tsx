import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ITopic } from '../../../models/topic';
import { loadFakeData } from '../../../utils';
import AppHomeCategoryCard from '../AppHomeCategoryCard/AppHomeCategoryCard';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Props {
  topics?: ITopic[];
  showLoading?: boolean;
  onPress: (ev: any) => void | any;
}

const AppHomeCategories: React.FC<Props> = ({
  topics,
  onPress,
  showLoading,
}) => {
  const fakeArr = loadFakeData();

  const renderLoadingSkeleton = () => {
    return fakeArr.map((item, index) => (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={110}
          height={160}
          borderRadius={12}
        />
      </SkeletonPlaceholder>
    ));
  };

  const renderCategories = () => {
    if (topics) {
      return topics.map((topic: ITopic, index: number) => (
        <AppHomeCategoryCard
          topic={topic}
          key={index}
          onPress={() => onPress(topic.id)}
        />
      ));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        bounces={false}>
        {showLoading ? renderLoadingSkeleton() : renderCategories()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 10,
    height: 180,
    paddingStart: 8,
  },
});

export default AppHomeCategories;
