import { Dimensions } from 'react-native';

export const loadFakeData = () =>
  Array.from({
    length: 15,
  });

export const getWindowWidth = (percentage: string | number) => {
  if (typeof percentage === 'number') {
    return Dimensions.get('window').width * (percentage / 100);
  } else {
    return (
      Dimensions.get('window').width *
      (Number(percentage.replace('%', '')) / 100)
    );
  }
};

export const getWindowHeight = (percentage: string | number) => {
  if (typeof percentage === 'number') {
    return Dimensions.get('window').height * (percentage / 100);
  } else {
    return (
      Dimensions.get('window').height *
      (Number(percentage.replace('%', '')) / 100)
    );
  }
};
