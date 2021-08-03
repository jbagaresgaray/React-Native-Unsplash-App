import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {ITopic} from '../../../models/topic';
import AppHomeCategoryCard from '../AppHomeCategoryCard/AppHomeCategoryCard';

interface Props {
  topics?: ITopic[];
  onPress: (ev: any) => void | any;
}

const AppHomeCategories: React.FC<Props> = ({topics, onPress}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        bounces={false}>
        {topics &&
          topics.map((topic: ITopic, index: number) => (
            <AppHomeCategoryCard
              topic={topic}
              key={index}
              onPress={() => onPress(topic.id)}
            />
          ))}
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
