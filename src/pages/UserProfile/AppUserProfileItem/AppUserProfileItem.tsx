import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import AppButton from '../../../components/AppButton/AppButton';
import AppTag from '../../../components/AppTag/AppTag';
import {COLORS} from '../../../constants/Colors';

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

const AppUserProfileItem: React.FC<Props> = ({
  name,
  username,
  profile_image,
  bio,
  location,
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
              tags.map((tag: any, index) => (
                <AppTag title={tag.title} key={index} />
              ))}
          </View>
        </ListItem.Content>
      </ListItem>
      <View style={styles.actionContainer}>
        <View style={styles.followerFollowingWrapper}>
          <View style={styles.followerFollowingView}>
            <Text style={styles.followerFollowingCount}>{followers_count}</Text>
            <Text style={styles.followerFollowingText}>Followers</Text>
          </View>
          <View style={styles.followerFollowingView}>
            <Text style={styles.followerFollowingCount}>{following_count}</Text>
            <Text style={styles.followerFollowingText}>Following</Text>
          </View>
        </View>
        <View style={styles.followMessageContainer}>
          <Button
            containerStyle={styles.followButton}
            buttonStyle={styles.followButtonStyle}
            titleStyle={styles.followButtonTitleStyle}
            icon={<Icon name="person-add" size={18} color="#767676" />}
          />
          <Button
            containerStyle={styles.followButton}
            buttonStyle={styles.followButtonStyle}
            titleStyle={styles.followButtonTitleStyle}
            icon={<Icon name="mail" size={18} color="#767676" />}
          />
        </View>
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
  followButton: {
    padding: 4,
  },
  followButtonStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderColor: '#d1d1d1',
    borderWidth: 0.5,
    paddingStart: 12,
    paddingEnd: 12,
  },
  followButtonTitleStyle: {
    fontSize: 14,
    color: COLORS.black,
  },
  followerFollowingWrapper: {
    flexDirection: 'row',
  },
  followMessageContainer: {
    flexDirection: 'row',
  },
  followerFollowingView: {
    padding: 4,
    alignItems: 'center',
  },
  followerFollowingCount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
  },
  followerFollowingText: {
    fontSize: 13,
  },
  tagsWrapper: {
    paddingTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default AppUserProfileItem;
