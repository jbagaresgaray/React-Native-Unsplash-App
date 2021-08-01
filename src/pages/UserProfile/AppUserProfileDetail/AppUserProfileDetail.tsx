import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import AppTag from '../../../components/AppTag/AppTag';
import AppUserProfileFollowerFollowing from '../AppUserProfileFollowerFollowing/AppUserProfileFollowerFollowing';
import AppUserProfileFollowMessage from '../AppUserProfileFollowMessage/AppUserProfileFollowMessage';

interface Props {
  name: string;
  username: string;
  bio: string;
  location: string;
  tags: [];
  followers_count: number;
  following_count: number;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

const AppUserProfileDetail: React.FC<Props> = ({
  name,
  username,
  profile_image,
  followers_count,
  following_count,
  tags,
}) => {
  return (
    <View>
      <ListItem>
        <Avatar
          rounded
          size="large"
          source={{
            uri: profile_image?.large,
          }}
        />
        <ListItem.Content>
          <ListItem.Title numberOfLines={1} style={styles.name}>
            {name}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.username}>
            {username}
          </ListItem.Subtitle>
          <View style={styles.tagsWrapper}>
            {tags &&
              tags.map((tag: any, index: number) => (
                <AppTag title={tag.title} key={index} />
              ))}
          </View>
        </ListItem.Content>
      </ListItem>
      <View style={styles.actionContainer}>
        <AppUserProfileFollowerFollowing
          followers_count={followers_count}
          following_count={following_count}
        />
        <AppUserProfileFollowMessage />
      </View>

      {/* <View style={styles.bioLocationContainer}>
            <Text>{bio}</Text>
            <Text>{location}</Text>
          </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
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
});

export default AppUserProfileDetail;
