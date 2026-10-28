import { StyleProp, ViewStyle } from 'react-native';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';

export interface EmptyStateProps {
  iconName?: IoniconsIconName;
  title: string;
  description?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
