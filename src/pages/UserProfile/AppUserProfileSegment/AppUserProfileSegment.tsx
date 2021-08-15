import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Tab, Icon } from 'react-native-elements';
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
          icon={<Icon name="photo" type="material" />}
        />
        <Tab.Item
          containerStyle={styles.TabStyle}
          buttonStyle={styles.TabItemStyle}
          titleStyle={styles.TabItemTitleStyle}
          icon={<Icon name="heart" type="material-community" />}
        />
        <Tab.Item
          containerStyle={styles.TabStyle}
          buttonStyle={styles.TabItemStyle}
          titleStyle={styles.TabItemTitleStyle}
          icon={<Icon name="layers" type="ionicons" />}
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
    height: Platform.OS === 'ios' ? 44 : 52,
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
