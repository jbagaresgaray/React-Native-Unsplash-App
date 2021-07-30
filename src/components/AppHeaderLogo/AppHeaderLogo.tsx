import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';

import LogoImage from '../../assets/svg/Unsplash_Logo_Full.svg';
import LogoImageWhite from '../../assets/svg/Unsplash_Logo_Full_White.svg';

interface Props {
  color?: 'dark' | 'white' | undefined;
  height?: number;
  width?: number;
}

const AppHeaderLogo: React.FC<Props> = ({color, height, width}) => {
  const getProps = () => {
    return {
      height: !!height ? height : 60,
      width: !!width ? width : 250,
    };
  };

  const renderLogo = () => {
    if (color === 'dark') {
      return <LogoImage {...getProps()} />;
    } else {
      return <LogoImageWhite {...getProps()} />;
    }
  };

  return !!color ? renderLogo() : <LogoImageWhite {...getProps()} />;
};

const styles = StyleSheet.create({
  splashImage: {
    height: 30,
    width: 130,
  },
});

export default AppHeaderLogo;
