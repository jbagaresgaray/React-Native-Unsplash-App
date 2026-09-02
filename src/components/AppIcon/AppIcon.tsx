import React from 'react';
import Feather from '@react-native-vector-icons/feather/static';
import FontAwesome from '@react-native-vector-icons/fontawesome/static';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons/static';
import MaterialIcons from '@react-native-vector-icons/material-icons/static';

type IconProps<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  'family'
>;

export type AppIconProps =
  | ({ family: 'feather' } & IconProps<typeof Feather>)
  | ({ family: 'fontawesome' } & IconProps<typeof FontAwesome>)
  | ({ family: 'ionicons' } & IconProps<typeof Ionicons>)
  | ({ family: 'material-design' } & IconProps<typeof MaterialDesignIcons>)
  | ({ family: 'material' } & IconProps<typeof MaterialIcons>);

const iconFamilies = {
  feather: Feather,
  fontawesome: FontAwesome,
  ionicons: Ionicons,
  'material-design': MaterialDesignIcons,
  material: MaterialIcons,
};

const AppIcon = ({ family, ...iconProps }: AppIconProps) => {
  const Icon = iconFamilies[family] as React.ElementType;
  return <Icon {...iconProps} />;
};

export default AppIcon;
