import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  default as Icon,
  default as Icons,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/Colors';

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
    user: {
      name: string;
      username: string;
      profile_image: {
        small: string;
        medium: string;
        larget: string;
      };
    };
  };
  onUserPress?: () => void;
  onMorePress?: () => void;
  onImagePress?: () => void;
}

const AppCardItem: React.FC<Props> = ({
  index,
  item,
  onUserPress,
  onMorePress,
  onImagePress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.postHeader}>
        <TouchableWithoutFeedback
          style={styles.infoWrapper}
          onPress={onUserPress}>
          <FastImage
            style={styles.avatar}
            source={{uri: item?.user?.profile_image.medium}}
          />
          <View>
            <Text style={styles.name}>{item?.user?.name}</Text>
            <Text style={styles.username}>{item?.user?.username}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={onMorePress}>
          <Icons name="dots-vertical" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onImagePress}
        style={styles.imageContainer}>
        <FastImage style={styles.image} source={{uri: item?.urls?.thumb}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999',
  },
  avatar: {
    borderColor: '#ddd',
    borderWidth: 0.3,
    height: 36,
    width: 36,
    borderRadius: 36,
    marginRight: 10,
  },
  moreIcon: {
    color: COLORS.white,
  },
  infoGradient: {
    height: 56,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});

export default AppCardItem;
