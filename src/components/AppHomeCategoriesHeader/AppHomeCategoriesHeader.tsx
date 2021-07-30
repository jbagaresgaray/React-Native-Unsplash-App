import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/Colors';

const AppHomeCategoriesHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categorySubHeader}>
        <Text style={styles.mostPopular}>Most Popular</Text>
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
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  categoryHeaderTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.black,
  },
  viewAll: {
    fontSize: 14,
  },
  categorySubHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  mostPopular: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
    textTransform: 'uppercase',
  },
});

export default AppHomeCategoriesHeader;
