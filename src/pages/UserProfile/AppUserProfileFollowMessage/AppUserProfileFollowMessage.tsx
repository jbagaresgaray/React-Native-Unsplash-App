import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { COLORS } from '../../../constants/Colors';
import AppIcon from '../../../components/AppIcon/AppIcon';

const AppUserProfileFollowMessage = () => {
  return (
    <View style={styles.followMessageContainer}>
      <Button
        containerStyle={styles.followButton}
        buttonStyle={styles.followButtonStyle}
        titleStyle={styles.followButtonTitleStyle}
        icon={
          <AppIcon
            family="material"
            name="person-add"
            size={18}
            color="#767676"
          />
        }
      />
      <Button
        containerStyle={styles.followButton}
        buttonStyle={styles.followButtonStyle}
        titleStyle={styles.followButtonTitleStyle}
        icon={
          <AppIcon family="material" name="mail" size={18} color="#767676" />
        }
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
