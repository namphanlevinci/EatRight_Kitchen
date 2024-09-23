import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

export const screenWidth = () => (width >= height ? height : width);

export const screenHeight = () => (height >= width ? height : width);

export const scaleWidth = (size: number) => {
  return Math.round(screenWidth() * (size / 414));
};

export const scaleHeight = (size: number) => {
  return Math.round(screenHeight() * (size / 896));
};

const scale = width / 414;
export function scaleFont(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
