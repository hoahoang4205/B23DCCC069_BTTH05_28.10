import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreenProps } from './types';
import { styles } from './styles';
import { SearchComponent } from '../../components/SearchComponent';
import { ContentComponent } from '../../components/ContentComponent';
import { SkeletonItem } from '../../components/SkeletonItem';
import { EmptyState } from '../../components/EmptyState';
import { AvatarComponent } from '../../components/AvatarComponent';
import {
  subscribeConversations,
  ConversationItem,
} from '../../services/conversationService';
import { subscribeUser } from '../../services/userService';
import { UserProfile } from '../../services/authService';
import { auth } from '../../services/firebase';
import { removeVietnameseTones } from '../../utils/avatar';
import { formatConversationTime } from '../../utils/formatTime';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const currentUid = auth.currentUser?.uid || '';
  const currentName = auth.currentUser?.displayName || 'Tôi';

  const userListenersRef = useRef<Record<string, () => void>>({});

  useEffect(() => {
    if (!currentUid) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeConversations(currentUid, (convList) => {
      setConversations(convList);
      setLoading(false);
      setRefreshing(false);

      // Đăng ký lắng nghe realtime user profile cho từng peerId mới
      convList.forEach((conv) => {
        const peerId = conv.peerId;
        if (peerId && !userListenersRef.current[peerId]) {
          const unsubUser = subscribeUser(peerId, (profile) => {
            if (profile) {
              setProfiles((prev) => ({
                ...prev,
                [peerId]: profile,
              }));
            }
          });
          userListenersRef.current[peerId] = unsubUser;
        }
      });
    });

    return () => {
      unsubscribe();
      // Dọn dẹp toàn bộ peer user listeners
      Object.values(userListenersRef.current).forEach((unsub) => unsub());
      userListenersRef.current = {};
    };
  }, [currentUid]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const filteredConversations = useMemo(() => {
    if (!searchText.trim()) {
      return conversations;
    }
    const cleanQuery = removeVietnameseTones(searchText);
    return conversations.filter((item) => {
      const peerProfile = profiles[item.peerId];
      const peerName = peerProfile?.name || '';
      return (
        removeVietnameseTones(peerName).includes(cleanQuery) ||
        removeVietnameseTones(item.lastMessage).includes(cleanQuery)
      );
    });
  }, [conversations, profiles, searchText]);

  const handleOpenChat = (item: ConversationItem) => {
    const peerProfile = profiles[item.peerId];
    const peerName = peerProfile?.name || 'Trò chuyện';
    navigation.navigate('Chat', {
      peerId: item.peerId,
      peerName,
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

    if (conversations.length === 0) {
      return (
        <EmptyState
          iconName="chatbubbles-outline"
          title="Chưa có tin nhắn nào"
          description="Vào Danh bạ để bắt đầu trò chuyện với bạn bè"
          buttonTitle="Mở Danh bạ"
          onButtonPress={() => navigation.navigate('Contact')}
        />
      );
    }

    if (filteredConversations.length === 0) {
      return (
        <EmptyState
          iconName="search-outline"
          title="Không tìm thấy cuộc trò chuyện"
          description="Thử tìm bằng tên bạn bè hoặc nội dung tin nhắn khác"
        />
      );
    }

    return (
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.chatId}
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          const peer = profiles[item.peerId];
          const peerName = peer?.name || 'Người dùng';
          const isOnline = !!peer?.online;

          let subtitle = item.lastMessage;
          if (item.lastSenderId === currentUid) {
            subtitle = `Bạn: ${item.lastMessage}`;
          }

          return (
            <ContentComponent
              title={peerName}
              subtitle={subtitle}
              avatarName={peerName}
              avatarUid={item.peerId}
              online={isOnline}
              showStatus={true}
              timeText={formatConversationTime(item.updatedAt)}
              badgeCount={item.unreadCount}
              unread={item.unreadCount > 0}
              onPress={() => handleOpenChat(item)}
            />
          );
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tin nhắn</Text>
        <TouchableOpacity
          style={styles.headerAvatarButton}
          onPress={() => navigation.navigate('Setting')}
          activeOpacity={0.8}
        >
          <AvatarComponent
            name={currentName}
            uid={currentUid}
            size={40}
            showStatus={false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <SearchComponent
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm cuộc trò chuyện"
        />
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

export default HomeScreen;
