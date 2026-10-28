import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { SettingScreen } from '../screens/SettingScreen';
import { subscribeConversations } from '../services/conversationService';
import { auth } from '../services/firebase';
import { colors, typography } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs: React.FC = () => {
  const [totalUnread, setTotalUnread] = useState<number>(0);
  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    if (!currentUid) return;

    const unsubscribe = subscribeConversations(currentUid, (conversations) => {
      const sum = conversations.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0);
      setTotalUnread(sum);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUid]);

  const badgeValue = totalUnread > 99 ? '99+' : totalUnread > 0 ? totalUnread : undefined;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.offline,
        tabBarStyle: tabStyles.tabBar,
        tabBarLabelStyle: tabStyles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Tin nhắn',
          tabBarBadge: badgeValue,
          tabBarBadgeStyle: tabStyles.tabBadge,
          tabBarIcon: ({ color, focused }) => (
            <Text style={[tabStyles.tabIcon, { color }]}>
              {focused ? '💬' : '🗨'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Danh bạ',
          tabBarIcon: ({ color, focused }) => (
            <Text style={[tabStyles.tabIcon, { color }]}>
              {focused ? '👥' : '👤'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, focused }) => (
            <Text style={[tabStyles.tabIcon, { color }]}>
              {focused ? '🔔' : '🔕'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ color, focused }) => (
            <Text style={[tabStyles.tabIcon, { color }]}>
              {focused ? '⚙' : '🔧'}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 64,
    paddingBottom: 10,
    paddingTop: 6,
    elevation: 0,
  },
  tabLabel: {
    ...typography.tiny,
    fontSize: 11,
    fontWeight: '700',
  },
  tabIcon: {
    fontSize: 22,
  },
  tabBadge: {
    backgroundColor: colors.accent,
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    lineHeight: 16,
  },
});

export default MainTabs;
