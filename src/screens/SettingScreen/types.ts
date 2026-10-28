import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../navigation/types';

export type SettingScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Setting'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export interface SettingScreenProps {
  navigation: SettingScreenNavigationProp;
}
