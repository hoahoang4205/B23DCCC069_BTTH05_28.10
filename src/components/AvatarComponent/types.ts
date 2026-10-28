import { StyleProp, ViewStyle } from 'react-native';

export interface AvatarComponentProps {
  name?: string;
  uid?: string;
  size?: number;
  online?: boolean;
  showStatus?: boolean;
  style?: StyleProp<ViewStyle>;
}
