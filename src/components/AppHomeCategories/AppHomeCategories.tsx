import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../../constants';
import {COLORS} from '../../constants/Colors';
import AppHomeCategoryCard from '../AppHomeCategoryCard/AppHomeCategoryCard';

interface Props {
  categories?: any[];
}

const AppHomeCategories: React.FC<Props> = ({categories}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        bounces={false}>
        {categories &&
          categories.map((category, index) => (
            <AppHomeCategoryCard index={index} item={category} key={index} />
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
