import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppSearchCollections from '../AppSearchCollections/AppSearchCollections';
import AppSearchPhotos from '../AppSearchPhotos/AppSearchPhotos';

interface Props {
  onPressImage: () => void;
  CollectionsArr?: any[];
}

const AppRelatedCollections: React.FC<Props> = ({
  onPressImage,
  CollectionsArr,
}) => {
  return (
    <View>
      <Text style={styles.caption}>Related Collections</Text>
      <AppSearchCollections
        refreshing={false}
        onPressImage={onPressImage}
        CollectionsArr={CollectionsArr}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  caption: {
    margin: 12,
    fontSize: 18,
    fontWeight: '400',
    color: '#111',
  },
});

export default AppRelatedCollections;
