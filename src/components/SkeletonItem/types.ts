import { StyleProp, ViewStyle } from 'react-native';

export interface SkeletonItemProps {
  style?: StyleProp<ViewStyle>;
  type?: 'contact' | 'message';
}
