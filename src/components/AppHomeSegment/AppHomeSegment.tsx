import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Tab} from 'react-native-elements';
import {COLORS} from '../../constants/Colors';

interface Props {
  activeIndex?: number;
  onChange?: (value: number) => void;
}

const AppHomeSegment: React.FC<Props> = ({activeIndex, onChange}) => {
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
          title="Editorial"
        />
        <Tab.Item
          containerStyle={styles.TabStyle}
          buttonStyle={styles.TabItemStyle}
          titleStyle={styles.TabItemTitleStyle}
          title="Following"
        />
      </Tab>
    </View>
  );
};

const styles = StyleSheet.create({
  SegmentToolbar: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingStart: 32,
    paddingEnd: 32,
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

export default AppHomeSegment;
