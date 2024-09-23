import {scaleFont} from '../utils/scale';
import * as React from 'react';
import {Text, TextProps} from 'react-native';

export function CustomText(
  props: TextProps & {fontWeight?: 'bold' | '700' | '500'},
) {
  const fontFamily =
    props?.fontWeight === 'bold'
      ? 'OpenSans-SemiBold'
      : props?.fontWeight === '700'
      ? 'OpenSans-Bold'
      : props?.fontWeight === '500'
      ? 'OpenSans-Medium'
      : 'OpenSans';

  return (
    <Text
      {...props}
      style={[
        {fontWeight: props.fontWeight, fontSize: scaleFont(12)},
        props.style,
      ]}
      allowFontScaling={false}
    />
  );
}
