import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import AppCollectionItem from '../AppCollectionItem/AppCollectionItem';

interface Props {
  refreshing: boolean;
  onRefresh?: () => void;
  onPressImage: (ev?: any) => void;
  onPressTitle: (ev?: any) => void;
  CollectionsArr?: any[] | null;
}

const AppSearchCollections: React.FC<Props> = ({
  refreshing,
  onRefresh,
  onPressImage,
  onPressTitle,
  CollectionsArr,
}) => {
  const renderItem = ({ item }: any) => (
    <AppCollectionItem
      item={item}
      onPressImage={() => onPressImage(item.id)}
      onPressTitle={() => onPressTitle(item.id)}
    />
  );

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingViewContainer}
      behavior="height">
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
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
