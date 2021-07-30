import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import AppHomeCategories from '../../components/AppHomeCategories/AppHomeCategories';
import AppHomeCategoriesHeader from '../../components/AppHomeCategoriesHeader/AppHomeCategoriesHeader';
import AppHomeSegment from '../../components/AppHomeSegment/AppHomeSegment';

import {COLORS} from '../../constants/Colors';
import CategoriesArr from '../../services/fake/topics.json';
import PhotosArr from '../../services/fake/photos.json';
import AppCardItem from '../../components/AppCardItem/AppCardItem';

const TabHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigation: any = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => null,
    });
  }, [navigation]);

  const renderItem = ({item}: any) => <AppCardItem item={item} />;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.SafeAreaView}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewContainer}
          behavior="height">
          <AppHomeSegment activeIndex={activeTab} onChange={setActiveTab} />
          <FlatList
            contentContainerStyle={{paddingBottom: 20}}
            ListHeaderComponent={() => (
              <>
                <AppHomeCategoriesHeader />
                <AppHomeCategories categories={CategoriesArr} />
              </>
            )}
            data={PhotosArr}
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
export default TabHome;
