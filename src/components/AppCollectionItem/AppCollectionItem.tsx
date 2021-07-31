import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PhotoGrid from 'react-native-thumbnail-grid';
import {COLORS} from '../../constants/Colors';
import {useEffect} from 'react';
import {Badge} from 'react-native-elements';

interface Props {
  index?: number;
  item?: {
    title: string;
    tags: any[];
    preview_photos: any[];
    total_photos: number;
    user: {
      name: string;
      username: string;
      profile_image: {
        small: string;
        medium: string;
        larget: string;
      };
    };
  };
  onPressImage: () => void;
}

const AppCollectionItem: React.FC<Props> = ({index, item, onPressImage}) => {
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    let previewsArr: any = [];
    const previewPhotos = item?.preview_photos;
    previewsArr = previewPhotos?.map(item => {
      return item?.urls.small;
    });
    setPhotoList(previewsArr);
  }, []);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.postHeader}>
        <View style={styles.infoWrapper}>
          <View>
            <Text style={styles.name}>{item?.title}</Text>
            <Text style={styles.username}>
              {item?.total_photos} Photos{' '}
              <Text>· Curated by {item?.user?.username}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.tagsWrapper}>
          {item?.tags &&
            item?.tags.map((tag, index) => (
              <Badge
                key={index}
                value={tag.title}
                textStyle={styles.tagTextStyle}
                containerStyle={styles.tagBadgeContainer}
                badgeStyle={styles.tagBadge}
              />
            ))}
        </View>
      </View>
      <View style={styles.imageContainer}>
        <PhotoGrid source={photoList} onPressImage={onPressImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
  },
  imageContainer: {
    // backgroundColor: 'red',
  },
  postHeader: {
    justifyContent: 'center',
    padding: 16,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 4,
    color: '#111',
  },
  username: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
  },
  tagsWrapper: {
    paddingTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadgeContainer: {
    padding: 2,
  },
  tagTextStyle: {
    fontSize: 10,
    color: '#767676',
    textTransform: "capitalize"
  },
  tagBadge: {
    height: 26,
    paddingStart: 8,
    paddingEnd: 8,
    backgroundColor: '#ddd',
  },
});

export default AppCollectionItem;
