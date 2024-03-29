import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '../../../constants/Colors';
import { ITopic } from '../../../interfaces/topic';

interface Props {
  topic?: ITopic;
  onPress: (ev: any) => void | any;
}

const AppHomeCategoryCard: React.FC<Props> = ({ topic, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable
          style={styles.imageWrapper}
          onPress={onPress}>
          <Image
            style={styles.image}
            placeholder={topic?.cover_photo?.blur_hash}
            source={{
              uri: topic?.cover_photo?.urls.small,
            }}
          />
        </Pressable>
        <View style={styles.title}>
          <Text numberOfLines={1} style={styles.titleText}>
            {topic?.title}
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
