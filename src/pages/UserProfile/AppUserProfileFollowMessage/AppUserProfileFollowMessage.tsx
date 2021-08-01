import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {COLORS} from '../../../constants/Colors';

const AppUserProfileFollowMessage = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  followMessageContainer: {
    flexDirection: 'row',
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
});

export default AppUserProfileFollowMessage;
