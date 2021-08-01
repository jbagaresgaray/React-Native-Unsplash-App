import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppTag from '../AppTag/AppTag';

interface Props {
  tagsArr?: any[];
}

const AppRelatedTags: React.FC<Props> = ({tagsArr}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Related Tags</Text>
      <View style={styles.tagsWrapper}>
        {tagsArr &&
          tagsArr.map((tag: any, index: number) => (
            <AppTag title={tag.title} key={index} />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
  },
  caption: {
    margin: 12,
    fontSize: 18,
    fontWeight: '400',
    color: '#111',
  },
  tagsWrapper: {
    paddingTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default AppRelatedTags;
