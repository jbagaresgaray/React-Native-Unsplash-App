import React from 'react';
import {BottomTabBar, BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';

let tabBarLayout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

// there is exported way to get current tabbar height
export function getTabBarHeight() {
  return tabBarLayout.height;
}

const AppTabBar: React.FC<BottomTabBarProps> = (props: BottomTabBarProps) => {
  return (
    <View
      collapsable={false}
      onLayout={event => {
        tabBarLayout = event.nativeEvent.layout;
      }}>
      <BottomTabBar {...props} />
    </View>
  );
};

export default AppTabBar;
