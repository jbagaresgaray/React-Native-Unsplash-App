import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tab } from 'react-native-elements';
import { COLORS } from '../../../constants/Colors';

interface Props {
  activeIndex?: number;
  onChange?: (value: number) => void;
  total_collections?: number;
  total_likes?: number;
  total_photos?: number;
}

const AppUserProfileSegment: React.FC<Props> = ({
  activeIndex,
  onChange,
  total_collections,
  total_likes,
  total_photos,
}) => {
  return (
    <View style={styles.SegmentToolbar}>
      <Tab
        indicatorStyle={styles.TabIndicatorStyle}
        value={activeIndex}
        onChange={onChange}>
        <Tab.Item
          containerStyle={styles.TabStyle}
          buttonStyle={styles.TabItemStyle}
          titleStyle={styles.TabItemTitleStyle}
          title={`Photos`}
        />
        <Tab.Item
          containerStyle={styles.TabStyle}
          buttonStyle={styles.TabItemStyle}
          titleStyle={styles.TabItemTitleStyle}
          title={`Likes`}
        />
        <Tab.Item
          containerStyle={styles.TabStyle}
          buttonStyle={styles.TabItemStyle}
          titleStyle={styles.TabItemTitleStyle}
          title={`Collections`}
        />
      </Tab>
    </View>
  );
};

const styles = StyleSheet.create({
  SegmentToolbar: {
    paddingStart: 32,
    paddingEnd: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  TabStyle: {
    backgroundColor: COLORS.white,
  },
  TabIndicatorStyle: {
    borderBottomWidth: 2,
    backgroundColor: COLORS.black,
  },
  TabItemStyle: {
    height: 44,
    backgroundColor: COLORS.white,
    tintColor: '#999999',
  },
  TabItemTitleStyle: {
    fontSize: 14,
    color: COLORS.black,
    textTransform: 'none',
  },
});

export default AppUserProfileSegment;
