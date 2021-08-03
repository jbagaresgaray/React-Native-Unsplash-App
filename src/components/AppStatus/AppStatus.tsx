import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AppStatus: React.FC = () => {
  return (
    <View style={styles.featureView}>
      <View style={styles.featureStatus}></View>
      <Text>Open</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  featureView: {
    backgroundColor: '#c2ebd3',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    width: 65,
  },
  featureStatus: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#3cb46e',
    marginRight: 6,
  },
});

export default AppStatus;
