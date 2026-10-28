import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingScreenProps } from './types';
import { styles } from './styles';
import { AvatarComponent } from '../../components/AvatarComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { Toast } from '../../components/Toast';
import { auth } from '../../services/firebase';
import { logout } from '../../services/authService';
import { useToast } from '../../hooks/useToast';
import { formatJoinDate } from '../../utils/formatTime';

export const SettingScreen: React.FC<SettingScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast, showToast } = useToast();

  const currentUser = auth.currentUser;
  const name = currentUser?.displayName || 'Người dùng';
  const email = currentUser?.email || 'Chưa cập nhật';
  const uid = currentUser?.uid || '';
  const createdAt = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).getTime()
    : Date.now();

  const handleLogoutPress = () => {
    Alert.alert(
      'Đăng xuất?',
      'Bạn sẽ cần đăng nhập lại để tiếp tục nhắn tin.',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: performLogout,
        },
      ]
    );
  };

  const performLogout = async () => {
    setLoading(true);
    try {
      await logout();
      const parentNav = navigation.getParent<any>();
      if (parentNav) {
        parentNav.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        (navigation as any).reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } catch (err) {
      showToast('Đăng xuất thất bại. Vui lòng thử lại.', 'danger');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Thẻ hồ sơ */}
        <View style={styles.profileCard}>
          <AvatarComponent
            name={name}
            uid={uid}
            size={88}
            showStatus={false}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
          <View style={styles.activeChip}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Đang hoạt động</Text>
          </View>
        </View>

        {/* Nhóm Tài khoản */}
        <Text style={styles.sectionTitle}>Tài khoản</Text>
        <View style={styles.cardGroup}>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Họ tên</Text>
            <Text style={styles.rowValue}>{name}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Email</Text>
            <Text style={styles.rowValue}>{email}</Text>
          </View>
          <View style={[styles.rowItem, styles.rowItemLast]}>
            <Text style={styles.rowLabel}>Tham gia từ</Text>
            <Text style={styles.rowValue}>{formatJoinDate(createdAt)}</Text>
          </View>
        </View>

        {/* Nhóm Ứng dụng */}
        <Text style={styles.sectionTitle}>Ứng dụng</Text>
        <View style={styles.cardGroup}>
          <View style={[styles.rowItem, styles.rowItemLast]}>
            <Text style={styles.rowLabel}>Phiên bản</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
        </View>

        {/* Nút Đăng xuất */}
        <ButtonComponent
          title="Đăng xuất"
          variant="secondary"
          onPress={handleLogoutPress}
          loading={loading}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
          leftIcon={<Ionicons name="exit-outline" size={18} color={styles.logoutIcon.color} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
