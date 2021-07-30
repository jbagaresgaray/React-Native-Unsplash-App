import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {COLORS} from '../../constants/Colors';

const TabSearch = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.emptyView}>
        <Text>Search Page</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyView: {justifyContent: 'center', alignItems: 'center'},
});

export default TabSearch;
