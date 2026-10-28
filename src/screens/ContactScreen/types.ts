import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../navigation/types';

export type ContactScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Contact'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export interface ContactScreenProps {
  navigation: ContactScreenNavigationProp;
}
