import React from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Image } from 'expo-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  default as Icon,
  default as Icons,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/Colors';
import { IPhoto } from '../../interfaces/photo';
import { getWindowHeight } from '../../utils';
import AppUserCardItem from '../AppUserCardItem/AppUserCardItem';

interface Props {
  item?: IPhoto;
  showLoading?: boolean;
  onUserPress?: () => void;
  onMorePress?: () => void;
  onImagePress?: () => void;
}

const AppCardItem: React.FC<Props> = ({
  item,
  showLoading,
  onUserPress,
  onMorePress,
  onImagePress,
}) => {
  const renderLoadingSkeleton = () => (
    <>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          paddingTop={16}
          paddingBottom={16}
          marginStart={16}
          marginEnd={16}
          flexDirection="row"
          alignItems="center">
          <SkeletonPlaceholder.Item width={36} height={36} borderRadius={999} />
          <SkeletonPlaceholder.Item marginLeft={10}>
            <SkeletonPlaceholder.Item
              width={120}
              height={14}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={80}
              height={12}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={Dimensions.get('window').width}
          height={300}
        />
      </SkeletonPlaceholder>
    </>
  );

  const renderCardItem = () => (
    <View style={styles.cardContainer}>
      <AppUserCardItem
        user={item?.user}
        onMorePress={onMorePress}
        onUserPress={onUserPress}
      />
      <Pressable
        onPress={onImagePress}
        style={styles.imageContainer}>
        <Image
          style={styles.image}
          placeholder={item?.blur_hash}
          source={{ uri: item?.urls?.small }}
        />
      </Pressable>
      <View style={styles.reactionsWrapper}>
        <View style={styles.reactions}>
          <View style={styles.lReactions}>
            <Button
              containerStyle={styles.reactionButton}
              buttonStyle={styles.reactionButtonStyle}
              type="clear"
              icon={<Icons name="heart" size={24} color="#767676" />}
            />
            <Button
              containerStyle={styles.reactionButton}
              buttonStyle={styles.reactionButtonStyle}
              type="clear"
              icon={<Icon name="plus" size={24} color="#767676" />}
            />
          </View>
          <View style={styles.rReactions}>
            <Button
              containerStyle={styles.reactionButton}
              buttonStyle={styles.reactionButtonStyle}
              type="clear"
              icon={<Icon name="download" size={24} color="#767676" />}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return showLoading ? renderLoadingSkeleton() : renderCardItem();
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  moreIcon: {
    color: COLORS.white,
  },
  infoGradient: {
    height: 56,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  reactionsWrapper: {
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rReactions: {},
  lReactions: {
    flexDirection: 'row',
    width: 24.3 * 3 + 15,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  reactionButton: {
    padding: 2,
  },
  reactionButtonStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderColor: '#d1d1d1',
    borderWidth: 0.5,
    paddingStart: 8,
    paddingEnd: 8,
  },
});

export default AppCardItem;
