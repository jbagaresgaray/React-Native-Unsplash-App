import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const STATUS_BAR_HEIGHT: number = getStatusBarHeight();
export const SCREEN_HEIGHT: number = Math.round(
  Dimensions.get('window').height,
);
export const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width);

export type COLOR_TYPES =
  | 'black_and_white'
  | 'black'
  | 'white'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'purple'
  | 'magenta'
  | 'green'
  | 'teal'
  | 'blue';

export type ORIENTATION_TYPES = 'landscape' | 'portrait' | 'squarish';

export type ORDER_BY_TYPES = 'featured' | 'latest' | 'oldest' | 'position';
