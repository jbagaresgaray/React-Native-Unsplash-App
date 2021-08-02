import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Button, ListItem, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../../constants/Colors';

interface Props {
  title: string;
  name: string;
  username: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  onProfilePress?: () => void;
}

const AppCollectionDetailsHeader: React.FC<Props> = ({
  title,
  name,
  username,
  profile_image,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderTitle}>{title}</Text>
      </View>
      <ListItem>
        <Avatar
          onPress={onProfilePress}
          rounded
          size="small"
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
          <Button
            containerStyle={styles.followButton}
            buttonStyle={styles.followButtonStyle}
            titleStyle={styles.followButtonTitleStyle}
            icon={
              <Icon
                name="share"
                size={21}
                color="#767676"
                type="material-community"
              />
            }
          />
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 32,
    paddingTop: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  categoryHeader: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  categoryHeaderTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.black,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  followButton: {
    padding: 2,
  },
  followButtonStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderColor: '#d1d1d1',
    borderWidth: 0.5,
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  followButtonTitleStyle: {
    fontSize: 14,
    color: COLORS.black,
  },
});

export default AppCollectionDetailsHeader;
