import {useNavigation} from '@react-navigation/core';
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {COLORS} from '../../constants/Colors';

const TabAccount = () => {
  const navigation: any = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.emptyView}>
        <Text>Account Page</Text>
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

export default TabAccount;
