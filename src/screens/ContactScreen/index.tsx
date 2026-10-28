import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContactScreenProps } from './types';
import { styles } from './styles';
import { SearchComponent } from '../../components/SearchComponent';
import { ContentComponent } from '../../components/ContentComponent';
import { SkeletonItem } from '../../components/SkeletonItem';
import { EmptyState } from '../../components/EmptyState';
import { subscribeUsers } from '../../services/userService';
import { UserProfile } from '../../services/authService';
import { auth } from '../../services/firebase';
import { removeVietnameseTones } from '../../utils/avatar';
import { formatLastSeen } from '../../utils/formatTime';

export const ContactScreen: React.FC<ContactScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const currentUid = auth.currentUser?.uid || '';

  // Debounce search 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (!currentUid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setHasError(false);

    const unsubscribe = subscribeUsers(currentUid, (userList) => {
      setUsers(userList);
      setLoading(false);
      setRefreshing(false);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUid]);

  const onRefresh = () => {
    setRefreshing(true);
    // Realtime listener đã đồng bộ, giữ cảm giác refresh mượt
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return users;
    }
    const cleanQuery = removeVietnameseTones(debouncedSearch);
    return users.filter((u) => {
      const matchName = removeVietnameseTones(u.name).includes(cleanQuery);
      const matchEmail = u.email.toLowerCase().includes(cleanQuery);
      return matchName || matchEmail;
    });
  }, [users, debouncedSearch]);

  const onlineCount = useMemo(() => {
    return users.filter((u) => u.online).length;
  }, [users]);

  const handleSelectUser = (peer: UserProfile) => {
    navigation.navigate('Chat', {
      peerId: peer.uid,
      peerName: peer.name,
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonItem key={i} type="contact" />
          ))}
        </View>
      );
    }

    if (hasError) {
      return (
        <EmptyState
          iconName="warning-outline"
          title="Không tải được danh bạ"
          description="Đã có lỗi xảy ra khi đồng bộ danh sách bạn bè."
          buttonTitle="Thử lại"
          onButtonPress={() => {
            setLoading(true);
            setHasError(false);
          }}
        />
      );
    }

    if (users.length === 0) {
      return (
        <EmptyState
          iconName="people-outline"
          title="Chưa có ai trong danh bạ"
          description="Mời bạn bè đăng ký để bắt đầu trò chuyện nhé!"
        />
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <EmptyState
          iconName="search-outline"
          title="Không tìm thấy kết quả"
          description="Thử tìm bằng tên khác xem sao"
        />
      );
    }

    return (
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.uid}
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <ContentComponent
            title={item.name}
            subtitle={formatLastSeen(
              item.online,
              typeof item.lastSeen === 'number' ? item.lastSeen : 0
            )}
            avatarName={item.name}
            avatarUid={item.uid}
            online={item.online}
            showStatus={true}
            onPress={() => handleSelectUser(item)}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh bạ</Text>
        <View style={styles.onlineChip}>
          <Text style={styles.onlineChipText}>Đang online: {onlineCount}</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchComponent
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm theo tên"
        />
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

export default ContactScreen;
