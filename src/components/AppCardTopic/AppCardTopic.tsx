import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { View, Text } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Image } from 'expo-image';
import { COLORS } from '../../constants/Colors';
import { IPreviewPhotos } from '../../interfaces/generic';
import { IPhoto } from '../../interfaces/photo';
import { IUser } from '../../interfaces/user';
import AppStatus from '../AppStatus/AppStatus';

interface Props {
  title?: string;
  description?: string;
  cover_photo?: IPhoto;
  owners: IUser;
  preview_photos?: IPreviewPhotos[];
  total_photos?: number;
  status?: string;
  featured?: boolean;
  onUserPress?: () => void;
  onPress?: () => void;
}

const AppCardTopic: React.FC<Props> = ({
  title,
  description,
  cover_photo,
  owners,
  total_photos,
  featured,
  status,
  onUserPress,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback
      style={styles.topicCardContainer}
      onPress={onPress}>
      <View>
        <View style={styles.cardImageContainer}>
          {status && status === 'open' && (
            <View style={styles.featureView}>
              <AppStatus />
            </View>
          )}
          <Image
            source={{
              uri: cover_photo?.urls?.small,
            }}
            style={styles.cardImage}
          />
        </View>
        <View style={styles.topicCardContent}>
          <View style={styles.topicCardHeader}>
            <View>
              <Text style={styles.topicCardHeaderTitle}>{title}</Text>
              <Text style={styles.topicCardHeaderSubTitle}>
                by {owners?.name}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={onUserPress}>
              <Avatar
                rounded
                source={{
                  uri: owners?.profile_image?.small,
                }}
                size="medium"
                containerStyle={styles.topicCardHeaderAvatar}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.topicDescriptionView}>
            <Text style={styles.topicDescriptionText} numberOfLines={2}>
              {description}
            </Text>
          </View>
          <View style={styles.topicContribution}>
            <Icon name="image" size={18} color="#767676" />
            <Text style={styles.topicContributionText} numberOfLines={2}>
              {total_photos} contributions
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topicCardContainer: {
    // marginTop: 8,
    marginBottom: 8,
  },
  topicCardContent: {
    backgroundColor: COLORS.white,
    paddingTop: 16,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  featureView: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  cardImageContainer: {
    position: 'relative',
    backgroundColor: 'transparent',
    height: 110,
  },
  cardImage: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topicCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  topicCardHeaderAvatar: {
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  topicCardHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  topicCardHeaderSubTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#767676',
  },
  topicDescriptionView: {
    marginTop: 0,
    marginBottom: 0,
  },
  topicDescriptionText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#111',
  },
  topicContribution: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicContributionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#111',
  },
});

export default AppCardTopic;
