import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Tab, Icon } from 'react-native-elements';
import { COLORS } from '../../../constants/Colors';

interface Props {
  activeIndex?: number;
  onChange?: (value: number) => void;
}

const AppSearchSegment: React.FC<Props> = ({ activeIndex, onChange }) => {
  return (
    <View style={styles.SegmentToolbar}>
      <Tab
        style={{
          flex: 1,
        }}
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
          icon={<Icon name="layers" type="ionicons" />}
        />
        <Tab.Item
          containerStyle={styles.TabStyle}
          buttonStyle={styles.TabItemStyle}
          titleStyle={styles.TabItemTitleStyle}
          icon={<Icon name="people" type="ionicons" />}
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
    // backgroundColor: 'red',
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

export default AppSearchSegment;
