import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, ButtonProps, Icon} from 'react-native-elements';
import {COLORS} from '../../constants/Colors';

interface Props extends ButtonProps {
  title?: string;
}

const AppButton: React.FC<Props> = props => {
  return (
    <Button
      containerStyle={styles.button}
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.titleStyle}
      title={props.title}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  buttonStyle: {
    backgroundColor: COLORS.black,
    height: 44,
    borderRadius: 8,
  },
  titleStyle: {
    paddingLeft: 12,
    fontSize: 14,
    color: COLORS.white,
  },
});

export default AppButton;
