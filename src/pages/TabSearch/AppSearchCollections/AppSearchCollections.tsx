import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import AppCollectionItem from '../../../components/AppCollectionItem/AppCollectionItem';

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
  onPressImage: () => void;
  CollectionsArr: any[];
}

const AppSearchCollections: React.FC<Props> = ({
  refreshing,
  onRefresh,
  onPressImage,
  CollectionsArr,
}) => {
  const renderItem = ({item}: any) => (
    <AppCollectionItem item={item} onPressImage={onPressImage} />
  );

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingViewContainer}
      behavior="height">
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={CollectionsArr}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingViewContainer: {
    position: 'relative',
    flex: 1,
  },
});

export default AppSearchCollections;
