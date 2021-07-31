import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../../constants/Colors';

interface Props {
  index?: number;
  item?: {
    title: string;
    cover_photo: {
      urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
      };
    };
  };
}

const AppHomeCategoryCard: React.FC<Props> = ({index, item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity activeOpacity={0.8} style={styles.imageWrapper}>
          <FastImage
            style={styles.image}
            source={{uri: item?.cover_photo?.urls.full}}
          />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text numberOfLines={1} style={styles.titleText}>
            {item?.title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.white,
  },
  imageContainer: {
    borderRadius: 12,
    width: 115,
    height: 160,
    padding: 2,
    // backgroundColor: COLORS.black,
    position: 'relative',
  },
  imageWrapper: {
    backgroundColor: COLORS.black,
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  image: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
  },
});

export default AppHomeCategoryCard;
