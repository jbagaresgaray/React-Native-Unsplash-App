import { useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useState,
  useLayoutEffect,
  createRef,
  useCallback,
} from 'react';
import { useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../constants/Colors';

import { getPhoto } from '../../stores/slices/photos/thunk';
import { photosSelectors } from '../../stores/slices/photos';
import ImageUserModal from '../ImageUserModal/ImageUserModal';
import AppUserProfileItem from '../UserProfile/AppUserProfileItem/AppUserProfileItem';

const ImageDetails: React.FC = () => {
  const userDetailModalRef: any = createRef();
  const [refreshing, setRefreshing] = useState(false);
  const [photoId, setPhotoId] = useState('');
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const dispatch = useDispatch<any>();

  const image = useSelector(photosSelectors.photo);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getPhoto(photoId));
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (params && params.id) {
      setPhotoId(params.id);
      dispatch(getPhoto(params.id));
    }
  }, [params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
    });
  }, [navigation]);

  const onProfileView = () => {
    userDetailModalRef.current?.setModalVisible();
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Image
        style={styles.bgImage}
        placeholder={image?.blur_hash}
        source={{
          uri: image?.urls?.regular,
        }}
      />
      <View style={styles.footerView}>
        <AppUserProfileItem
          name={image?.user?.name}
          username={image?.user?.username}
          profile_image={image?.user?.profile_image}
          onProfilePress={onProfileView}
        />
      </View>
      <ImageUserModal
        actionSheetRef={userDetailModalRef}
        name={image?.user?.name}
        username={image?.user?.username}
        profile_image={image?.user?.profile_image}
        related_collections={image?.related_collections?.results}
        tags={image?.tags}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  emptyView: { justifyContent: 'center', alignItems: 'center' },
  bgImage: {
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  footerView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ImageDetails;
