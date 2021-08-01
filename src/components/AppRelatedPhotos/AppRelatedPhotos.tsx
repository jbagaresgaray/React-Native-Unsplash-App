import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppSearchPhotos from '../AppSearchPhotos/AppSearchPhotos';

interface Props {
  onPressImage: () => void;
  PhotosArr?: any[];
}

const AppRelatedPhotos: React.FC<Props> = ({onPressImage, PhotosArr}) => {
  return (
    <View>
      <Text style={styles.caption}>Related Photos</Text>
      <AppSearchPhotos onPressImage={onPressImage} PhotosArr={PhotosArr} />
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

export default AppRelatedPhotos;
