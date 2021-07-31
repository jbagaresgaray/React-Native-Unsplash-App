import React, {useEffect, useMemo, useState} from 'react';
import {
  RefreshControl,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import FastImage from 'react-native-fast-image';

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
  onPressImage: () => void;
  PhotosArr: any[];
}

const ImageCard: React.FC<{item: any}> = ({item}) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);

  return (
    <View key={item.id} style={styles.ImageCardContainer}>
      <FastImage
        source={{uri: item.uri}}
        style={{
          height: randomBool ? 180 : 280,
          alignSelf: 'stretch',
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

const AppSearchPhotos: React.FC<Props> = ({
  refreshing,
  onRefresh,
  onPressImage,
  PhotosArr,
}) => {
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    let previewsArr: any = [];
    previewsArr = PhotosArr.map(item => {
      return {
        uri: item?.urls.small,
      };
    });
    setPhotoList(previewsArr);
  }, []);

  const renderItem = ({item}: any) => {
    return <ImageCard item={item} />;
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingViewContainer}
      behavior="height">
      <MasonryList
        data={photoList}
        contentContainerStyle={{
          paddingHorizontal: 8,
          alignSelf: 'stretch',
        }}
        numColumns={2}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
});

export default AppSearchPhotos;
