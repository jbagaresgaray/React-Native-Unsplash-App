import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Badge} from 'react-native-elements/dist/badge/Badge';

interface Props {
  title: string;
}

const AppTag: React.FC<Props> = ({title}) => {
  return (
    <Badge
      value={title}
      textStyle={styles.tagTextStyle}
      containerStyle={styles.tagBadgeContainer}
      badgeStyle={styles.tagBadge}
    />
  );
};

const styles = StyleSheet.create({
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
    textTransform: 'capitalize',
  },
  tagBadge: {
    height: 26,
    paddingStart: 8,
    paddingEnd: 8,
    backgroundColor: '#ddd',
  },
});

export default AppTag;
