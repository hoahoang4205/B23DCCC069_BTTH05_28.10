import { StyleProp, ViewStyle } from 'react-native';

export interface ContentComponentProps {
  title: string;
  subtitle: string;
  avatarName?: string;
  avatarUid?: string;
  online?: boolean;
  showStatus?: boolean;
  timeText?: string;
  badgeCount?: number;
  unread?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
