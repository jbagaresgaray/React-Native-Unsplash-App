import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import AppRelatedCollections from '../../components/AppRelatedCollections/AppRelatedCollections';
import AppRelatedPhotos from '../../components/AppRelatedPhotos/AppRelatedPhotos';
import AppRelatedTags from '../../components/AppRelatedTags/AppRelatedTags';
import AppUserProfileItem from '../UserProfile/AppUserProfileItem/AppUserProfileItem';

interface Props {
  actionSheetRef: any;
  name: string;
  username: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  related_collections?: any[];
  related_photos?: any[];
  tags: any[];
}

const ImageUserModal: React.FC<Props> = ({
  actionSheetRef,
  name,
  username,
  profile_image,
  related_photos,
  related_collections,
  tags,
}) => {
  const navigation = useNavigation();

  const onImagePress = () => {};

  const onProfileView = () => {
    dismiss();

    setTimeout(() => {
      navigation.navigate('UserProfile');
    }, 100);
  };

  const dismiss = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      statusBarTranslucent
      bounceOnOpen
      gestureEnabled
      drawUnderStatusBar={false}
      bounciness={4}
      defaultOverlayOpacity={0.4}
      containerStyle={styles.innerContainer}
      ref={actionSheetRef}>
      <AppUserProfileItem
        name={name}
        username={username}
        profile_image={profile_image}
        onProfilePress={onProfileView}
      />
      <ScrollView style={styles.content}>
        <AppRelatedPhotos
          onPressImage={onImagePress}
          PhotosArr={related_photos}
        />
        <View style={styles.divider}></View>
        <AppRelatedCollections
          onPressImage={onImagePress}
          CollectionsArr={related_collections}
        />
        <View style={styles.divider}></View>
        <AppRelatedTags tagsArr={tags} />
        <View style={styles.divider}></View>
      </ScrollView>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    // paddingTop: 32,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    // height: 200,
    // paddingBottom: 24,
  },
  content: {
    // height: 250,
    // paddingTop: 24,
    // paddingStart: 16,
    // paddingEnd: 16,
  },
  divider: {
    paddingTop: 60,
  },
});

export default ImageUserModal;
