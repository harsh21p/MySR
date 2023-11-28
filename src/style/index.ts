import merge from 'lodash/merge';
import {StyleSheet, ViewStyle} from 'react-native';

import Colors from './colors';
import Dimensions from './dimensions';
import HitSlop from './hit-slop';
import Layouts from './layouts';
import Spacing from './spacing';

const styleSheetMerge = (
  baseStyle: ViewStyle,
  ...diffStyles: ViewStyle[]
): ViewStyle => StyleSheet.create(merge({}, baseStyle, ...diffStyles));

export {Colors, Dimensions, HitSlop, Layouts, Spacing, styleSheetMerge};
