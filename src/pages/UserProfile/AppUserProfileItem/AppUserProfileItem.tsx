import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {IProfileImage} from '../../../models/generic';
import AppUserProfileFollowMessage from '../AppUserProfileFollowMessage/AppUserProfileFollowMessage';

interface Props {
  id?: string;
  name?: string;
  username?: string;
  profile_image?: IProfileImage;
  onProfilePress?: () => void;
}

const AppUserProfileItem: React.FC<Props> = ({
  name,
  username,
  profile_image,
  onProfilePress,
}) => {
  return (
    <View>
      <ListItem>
        <Avatar
          onPress={onProfilePress}
          rounded
          size={36}
          source={{
            uri: profile_image?.small,
          }}
        />
        <ListItem.Content style={styles.profileContainer}>
          <TouchableOpacity onPress={onProfilePress}>
            <ListItem.Title numberOfLines={1} style={styles.name}>
              {name}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.username}>
              {username}
            </ListItem.Subtitle>
          </TouchableOpacity>
          <View>
            <AppUserProfileFollowMessage />
          </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  username: {
    fontSize: 13,
    fontWeight: '400',
    color: '#767676',
  },
  bioLocationContainer: {
    paddingStart: 16,
    paddingEnd: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 16,
  },
  tagsWrapper: {
    paddingTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AppUserProfileItem;
