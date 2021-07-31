import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

interface Props {
  id: string;
  name: string;
  username: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

const AppUserItem: React.FC<Props> = ({name, username, profile_image}) => {
  return (
    <ListItem>
      <Avatar rounded size="medium" source={{uri: profile_image?.medium}} />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} style={styles.name}>
          {name}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.username}>
          {username}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111',
  },
  username: {
    fontSize: 13,
    color: '#767676',
  },
});

export default AppUserItem;
