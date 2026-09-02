import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { IUser } from '../../interfaces/user';
import AppIcon from '../AppIcon/AppIcon';

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
        onPress={onUserPress}
      >
        <Image
          style={styles.avatar}
          source={{
            uri: user?.profile_image?.small,
          }}
          transition={300}
        />
        <View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.username}>{user?.username}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Pressable onPress={onMorePress}>
        <AppIcon family="material-design" name="dots-vertical" size={24} />
      </Pressable>
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
