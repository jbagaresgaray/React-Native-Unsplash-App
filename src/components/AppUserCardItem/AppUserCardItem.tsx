import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { default as Icons } from 'react-native-vector-icons/MaterialCommunityIcons';
import { IUser } from '../../models/user';

interface Props {
  user?: IUser;
  onUserPress?: () => void;
  onMorePress?: () => void;
}

const AppUserCardItem: React.FC<Props> = ({
  user,
  onMorePress,
  onUserPress,
}) => {
  return (
    <View style={styles.postHeader}>
      <TouchableWithoutFeedback
        style={styles.infoWrapper}
        onPress={onUserPress}>
        <FastImage
          style={styles.avatar}
          source={{
            uri: user?.profile_image?.small,
          }}
        />
        <View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.username}>{user?.username}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={onMorePress}>
        <Icons name="dots-vertical" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  avatar: {
    borderColor: '#ddd',
    borderWidth: 0.3,
    height: 36,
    width: 36,
    borderRadius: 36,
    marginRight: 10,
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
});

export default AppUserCardItem;
