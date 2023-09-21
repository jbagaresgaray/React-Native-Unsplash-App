import React, { useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  LayoutChangeEvent,
  FlatList,
} from 'react-native';
// import MasonryList from '@react-native-seoul/masonry-list';
import { Image } from 'expo-image';
import isEmpty from 'lodash/isEmpty';
import { useNavigation } from '@react-navigation/core';
import { IPhoto } from '../../interfaces/photo';

interface Props {
  refreshing: boolean;
  onRefresh?: () => void;
  PhotosArr?: IPhoto[];
}

const ImageCard: React.FC<{ item: any; height: number; onPressImage: any }> = ({
  item,
  height,
  onPressImage,
}) => {
  return (
    <Pressable
      key={item.id}
      style={styles.ImageCardContainer}
      onPress={onPressImage}>
      <Image
        source={{ uri: item.uri }}
        placeholder={item?.blur_hash}
        style={{
          height: 120,
          width: 120,
          padding: 2,
        }}
      />
    </Pressable>
  );
};

const AppSearchPhotos: React.FC<Props> = ({
  refreshing,
  onRefresh,
  PhotosArr,
}) => {
  const [photoList, setPhotoList] = useState([]);
  const [itemHeight, setItemHeight] = useState(0);
  const navigation = useNavigation<any>();

  useEffect(() => {
    let previewsArr: any = [];
    if (PhotosArr && !isEmpty(PhotosArr)) {
      previewsArr = PhotosArr?.map(item => {
        return {
          id: item?.id,
          uri: item?.urls.small,
        };
      });
      setPhotoList(previewsArr);
    }
  }, []);

  const onImagePress = (id: string) => {
    navigation.navigate('ImageDetails', {
      id,
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <ImageCard
        item={item}
        height={itemHeight}
        onPressImage={() => onImagePress(item.id)}
      />
    );
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setItemHeight(width / 3);
  };

  const getItemLayout = (_: any, index: number) => {
    return { length: itemHeight, offset: itemHeight * index, index };
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
        columnWrapperStyle={[styles.columnWrapper, { height: itemHeight }]}
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
