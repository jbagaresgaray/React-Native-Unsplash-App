import React, {useEffect, useMemo, useState} from 'react';
import {
  RefreshControl,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  LayoutChangeEvent,
  FlatList,
} from 'react-native';
// import MasonryList from '@react-native-seoul/masonry-list';
import FastImage from 'react-native-fast-image';
import {FlatGrid} from 'react-native-super-grid';

interface Props {
  refreshing: boolean;
  onRefresh?: () => void;
  onPressImage: () => void;
  PhotosArr?: any[];
}

const ImageCard: React.FC<{item: any; height: number; onPressImage: any}> = ({
  item,
  height,
  onPressImage,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={item.id}
      style={styles.ImageCardContainer}
      onPress={onPressImage}>
      <FastImage
        source={{uri: item.uri}}
        style={{
          height: 120,
          width: 120,
          padding: 2,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const AppSearchPhotos: React.FC<Props> = ({
  refreshing,
  onRefresh,
  onPressImage,
  PhotosArr,
}) => {
  const [photoList, setPhotoList] = useState([]);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    let previewsArr: any = [];
    if (PhotosArr) {
      previewsArr = PhotosArr?.map(item => {
        return {
          id: item?.id,
          uri: item?.urls.small,
        };
      });
      setPhotoList(previewsArr);
    }
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <ImageCard item={item} height={itemHeight} onPressImage={onPressImage} />
    );
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setItemHeight(width / 3);
  };

  const getItemLayout = (_: any, index: number) => {
    return {length: itemHeight, offset: itemHeight * index, index};
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingViewContainer}
      behavior="height">
      {/* <MasonryList
        data={photoList}
        contentContainerStyle={{
          paddingHorizontal: 8,
          alignSelf: 'stretch',
        }}
        numColumns={2}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
      /> */}

      {/* <FlatGrid
        spacing={1}
        data={photoList}
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
      /> */}

      <FlatList
        onLayout={onLayout}
        style={styles.list}
        columnWrapperStyle={[styles.columnWrapper, {height: itemHeight}]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={photoList}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item: any) => item.id}
        getItemLayout={getItemLayout}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingViewContainer: {
    position: 'relative',
    flex: 1,
  },
  ImageCardContainer: {
    marginTop: 8,
    padding: 8,
    flex: 1,
  },
  list: {
    // marginTop: STATUS_BAR_HEIGHT,
    flex: 1,
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -2,
    marginRight: -2,
  },
});

export default AppSearchPhotos;
