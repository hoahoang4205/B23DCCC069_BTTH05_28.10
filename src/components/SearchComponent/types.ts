import { StyleProp, ViewStyle } from 'react-native';

export interface SearchComponentProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}
