import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import AppUserItem from '../AppUserItem/AppUserItem';
import { COLORS } from '../../constants/Colors';

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
  UsersArr: any[];
}

const AppSearchUsers: React.FC<Props> = ({ UsersArr }) => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation: any = useNavigation();

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onUserPress = (username: string) => {
    navigation.navigate('UserProfile', {
      username,
    });
  };

  const renderItem = ({ item }: any) => (
    <AppUserItem
      id={item.id}
      name={item.name}
      username={item.username}
      profile_image={item.profile_image}
      onPress={() => onUserPress(item.username)}
    />
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.SafeAreaView}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="height">
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={UsersArr}
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
});

export default AppSearchUsers;
