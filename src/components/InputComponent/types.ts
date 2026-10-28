import { ReactNode } from 'react';
import { TextInputProps, StyleProp, ViewStyle } from 'react-native';

export interface InputComponentProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
