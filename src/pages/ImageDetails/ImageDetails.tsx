import {useNavigation} from '@react-navigation/native';
import React, {useState, useLayoutEffect, createRef} from 'react';
import {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/Colors';

import Photo from '../../services/fake/photo.json';
import PhotosArr from '../../services/fake/user/photos.json';
import ImageUserModal from '../ImageUserModal/ImageUserModal';
import AppUserProfileItem from '../UserProfile/AppUserProfileItem/AppUserProfileItem';

const ImageDetails: React.FC = () => {
  const userDetailModalRef: any = createRef();
  const navigation: any = useNavigation();
  const [image, setImage] = useState(Photo);

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
      <FastImage
        style={styles.bgImage}
        source={{uri: image?.urls?.full, priority: FastImage.priority.high}}
        resizeMode={FastImage.resizeMode.cover}
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
        related_photos={PhotosArr.slice(0, 6)}
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
  emptyView: {justifyContent: 'center', alignItems: 'center'},
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
