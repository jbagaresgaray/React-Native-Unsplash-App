import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

interface Props {
  index?: number;
  item?: {
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
  };
}

const AppCardItem: React.FC<Props> = ({index, item}) => {
  return (
    <Card containerStyle={styles.imageContainer}>
      <FastImage style={styles.image} source={{uri: item?.urls?.thumb}} />
    </Card>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 250,
    padding: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default AppCardItem;
