import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/Colors';

interface Props {
  title?: string;
  description?: string;
  cover_photo?: {
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
  };
  owners: {
    username: string;
    id: string;
    name: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  preview_photos?: any[];
  total_photos?: number;
  featured?: boolean;
  onUserPress?: () => void;
  onMorePress?: () => void;
  onImagePress?: () => void;
}

const AppCardTopic: React.FC<Props> = ({
  title,
  description,
  cover_photo,
  owners,
  total_photos,
  featured,
}) => {
  return (
    <View style={styles.topicCardContainer}>
      <View style={styles.cardImageContainer}>
        {featured && (
          <View style={styles.featureView}>
            <View style={styles.featureStatus}></View>
            <Text>Open</Text>
          </View>
        )}
        <FastImage
          source={{
            uri: cover_photo?.urls?.regular,
            priority: FastImage.priority.high,
          }}
          style={styles.cardImage}
          resizeMode={FastImage.resizeMode.cover}
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
          <Avatar
            rounded
            source={{
              uri: owners?.profile_image?.medium,
            }}
            size="medium"
            containerStyle={styles.topicCardHeaderAvatar}
          />
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
    backgroundColor: '#c2ebd3',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    width: 65,

    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  featureStatus: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#3cb46e',
    marginRight: 6,
  },
  cardImageContainer: {
    backgroundColor: 'red',
    position: 'relative',
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
