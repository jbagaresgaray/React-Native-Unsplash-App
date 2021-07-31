import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/Colors';

const AppCollectionsHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderTitle}>Collections</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
  },
  categoryHeader: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  categoryHeaderTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.black,
  },
});

export default AppCollectionsHeader;
