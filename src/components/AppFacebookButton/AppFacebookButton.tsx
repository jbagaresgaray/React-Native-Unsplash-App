import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {COLORS} from '../../constants/Colors';

const AppFacebookButton: React.FC = () => {
  return (
    <Button
      containerStyle={styles.facebookButton}
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.titleStyle}
      icon={
        <Icon
          name="facebook"
          size={18}
          color={COLORS.facebook}
          type="font-awesome"
        />
      }
      title="Continue with Facebook"
    />
  );
};

const styles = StyleSheet.create({
  facebookButton: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  buttonStyle: {
    backgroundColor: COLORS.white,
    height: 44,
    borderRadius: 8,
  },
  titleStyle: {
    paddingLeft: 12,
    fontSize: 14,
    color: COLORS.facebook,
  },
});

export default AppFacebookButton;
