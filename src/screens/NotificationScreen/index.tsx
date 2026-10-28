import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationItem, NotificationScreenProps } from './types';
import { styles } from './styles';
import { EmptyState } from '../../components/EmptyState';
import { colors } from '../../theme';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Chào mừng bạn đến với ChatRealtime',
    description: 'Bắt đầu kết nối và trò chuyện thời gian thực với bạn bè ngay hôm nay.',
    time: 'Vừa xong',
    read: false,
    type: 'system',
  },
  {
    id: '2',
    title: 'Cập nhật bảo mật',
    description: 'Tài khoản của bạn đã được bảo vệ với hệ thống xác thực Firebase.',
    time: '1 giờ trước',
    read: false,
    type: 'system',
  },
  {
    id: '3',
    title: 'Tính năng chia sẻ vị trí',
    description: 'Bạn hiện đã có thể gửi tọa độ vị trí trực tiếp cho bạn bè khi chat.',
    time: 'Hôm qua',
    read: true,
    type: 'message',
  },
];

export const NotificationScreen: React.FC<NotificationScreenProps> = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const getIcon = (type?: string): IoniconsIconName => {
    switch (type) {
      case 'message':
        return 'location-outline';
      case 'friend':
        return 'person-outline';
      default:
        return 'notifications-outline';
    }
  };

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        {hasUnread && (
          <TouchableOpacity
            onPress={handleMarkAllAsRead}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.markAllText}>Đọc tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <EmptyState
          iconName="notifications-outline"
          title="Chưa có thông báo"
          description="Khi có tin tức hoặc cập nhật mới, thông báo sẽ xuất hiện ở đây."
        />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.itemContainer,
                !item.read && styles.itemUnread,
              ]}
              onPress={() => handleMarkAsRead(item.id)}
            >
              <View style={styles.iconCircle}>
                <Ionicons
                  name={getIcon(item.type)}
                  size={22}
                  color={colors.primary}
                />
              </View>

              <View style={styles.contentWrapper}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemTime}>{item.time}</Text>
              </View>

              {!item.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
