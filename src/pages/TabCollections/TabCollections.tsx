import React, {useLayoutEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import AppCollectionsHeader from './AppCollectionsHeader/AppCollectionsHeader';
import AppCollectionItem from '../../components/AppCollectionItem/AppCollectionItem';

import CollectionsArr from '../../services/fake/collections.json';
import {useNavigation} from '@react-navigation/native';

const TabCollections = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation: any = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => null,
    });
  }, [navigation]);

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onPressImage = () => {};

  const renderItem = ({item}: any) => (
    <AppCollectionItem item={item} onPressImage={onPressImage} />
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.SafeAreaView}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="height">
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={() => <AppCollectionsHeader />}
            data={CollectionsArr}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardAvoidingViewContainer: {
    position: 'relative',
    flex: 1,
  },
  emptyView: {justifyContent: 'center', alignItems: 'center'},
});

export default TabCollections;
