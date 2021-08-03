import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import AppHomeCategoryCard from '../AppHomeCategoryCard/AppHomeCategoryCard';

interface Props {
  categories?: any[];
  onPress?: () => void;
}

const AppHomeCategories: React.FC<Props> = ({categories, onPress}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        bounces={false}>
        {categories &&
          categories.map((category, index) => (
            <AppHomeCategoryCard
              item={category}
              key={index}
              onPress={onPress}
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
