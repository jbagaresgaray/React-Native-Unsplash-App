import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import AppRelatedCollections from '../../components/AppRelatedCollections/AppRelatedCollections';
import AppRelatedPhotos from '../../components/AppRelatedPhotos/AppRelatedPhotos';
import AppRelatedTags from '../../components/AppRelatedTags/AppRelatedTags';
import { ICollection } from '../../models/collection';
import { IProfileImage, ITag } from '../../models/generic';
import { IPhoto } from '../../models/photo';
import AppUserProfileItem from '../UserProfile/AppUserProfileItem/AppUserProfileItem';

interface Props {
  actionSheetRef: any;
  name?: string;
  username?: string;
  profile_image?: IProfileImage;
  related_collections?: ICollection[];
  related_photos?: IPhoto[];
  tags?: ITag[];
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

  const onPressImage = (id: string) => {
    dismiss();

    setTimeout(() => {
      navigation.navigate('CollectionDetails', {
        id,
      });
    });
  };

  const onPressTitle = (id: string) => {
    dismiss();

    setTimeout(() => {
      navigation.navigate('CollectionDetails', {
        id,
      });
    });
  };

  const onProfileView = () => {
    dismiss();

    setTimeout(() => {
      navigation.navigate('UserProfile', {
        username,
      });
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
      <ScrollView nestedScrollEnabled style={styles.content}>
        {related_photos && (
          <>
            <AppRelatedPhotos
              onPressImage={onImagePress}
              PhotosArr={related_photos}
            />
            <View style={styles.divider}></View>
          </>
        )}
        {related_collections && (
          <>
            <AppRelatedCollections
              onPressImage={onPressImage}
              onPressTitle={onPressTitle}
              CollectionsArr={related_collections}
            />
            <View style={styles.divider}></View>
          </>
        )}

        {tags && (
          <>
            <AppRelatedTags tagsArr={tags} />
            <View style={styles.divider}></View>
          </>
        )}
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
