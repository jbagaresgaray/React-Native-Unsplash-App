import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PhotoGrid from 'react-native-thumbnail-grid';
import {useEffect} from 'react';
import AppTag from '../AppTag/AppTag';
import {ICollection} from '../../interfaces/collection';

interface Props {
  index?: number;
  item?: ICollection;
  onPressImage: () => void;
  onPressTitle?: () => void;
}

const AppCollectionItem: React.FC<Props> = ({
  index,
  item,
  onPressImage,
  onPressTitle,
}) => {
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
          <TouchableOpacity onPress={onPressTitle}>
            <Text style={styles.name}>{item?.title}</Text>
            <Text style={styles.username}>
              {item?.total_photos} Photos{' '}
              <Text>· Curated by {item?.user?.username}</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tagsWrapper}>
          {item?.tags &&
            item?.tags.map((tag, index) => (
              <AppTag title={tag.title} key={index} />
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
});

export default AppCollectionItem;
