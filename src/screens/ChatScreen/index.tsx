import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatScreenProps } from './types';
import { styles } from './styles';
import { AvatarComponent } from '../../components/AvatarComponent';
import { MessageBubble } from '../../components/MessageBubble';
import { ChatInput } from '../../components/ChatInput';
import { EmptyState } from '../../components/EmptyState';
import { SkeletonItem } from '../../components/SkeletonItem';
import { Toast } from '../../components/Toast';
import { ButtonComponent } from '../../components/ButtonComponent';
import {
  getChatId,
  ensureChatParticipants,
  sendText,
  sendLocation,
  subscribeMessages,
  loadOlderMessages,
  markAsRead,
  ChatMessage,
} from '../../services/chatService';
import { subscribeUser } from '../../services/userService';
import { getCurrentLocation, LocationError } from '../../services/locationService';
import { UserProfile } from '../../services/authService';
import { auth } from '../../services/firebase';
import { useToast } from '../../hooks/useToast';
import {
  formatLastSeen,
  formatChatDateSeparator,
  isSameDay,
  isWithinMinutes,
} from '../../utils/formatTime';

export const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { peerId, peerName: initialPeerName } = route.params;
  const myUid = auth.currentUser?.uid || '';

  const chatId = getChatId(myUid, peerId);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatAccessError, setChatAccessError] = useState<boolean>(false);
  const [chatLoadAttempt, setChatLoadAttempt] = useState<number>(0);
  const [peerProfile, setPeerProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingOlder, setLoadingOlder] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [inputText, setInputText] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [confirmLocationVisible, setConfirmLocationVisible] = useState<boolean>(false);
  const [showScrollBottom, setShowScrollBottom] = useState<boolean>(false);

  const { toast, showToast } = useToast();
  const flatListRef = useRef<FlatList>(null);
  const isNearBottomRef = useRef<boolean>(true);

  // Theo dõi peer user realtime (tên, avatar, online, lastSeen)
  useEffect(() => {
    if (!peerId) return;
    const unsub = subscribeUser(peerId, (user) => {
      setPeerProfile(user);
    });
    return () => unsub();
  }, [peerId]);

  // Lắng nghe tin nhắn realtime + đánh dấu đã đọc
  useEffect(() => {
    if (!chatId || !myUid || !peerId) return;

    let isActive = true;
    let unsubscribe: (() => void) | undefined;
    setLoading(true);
    setChatAccessError(false);

    const handleAccessError = (error: Error) => {
      if (!isActive) return;
      console.warn('Unable to access chat messages:', error);
      setLoading(false);
      setChatAccessError(true);
      showToast(
        'Không có quyền xem cuộc trò chuyện. Hãy cập nhật Rules của Realtime Database.',
        'danger'
      );
    };

    const startListening = async () => {
      try {
        await ensureChatParticipants(chatId, myUid, peerId);
        if (!isActive) return;

        markAsRead(myUid, chatId);
        unsubscribe = subscribeMessages(
          chatId,
          (newMessages) => {
            if (!isActive) return;
            setMessages(newMessages);
            setLoading(false);
            markAsRead(myUid, chatId);

            if (isNearBottomRef.current) {
              setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
              }, 100);
            } else {
              setShowScrollBottom(true);
            }
          },
          50,
          handleAccessError
        );
      } catch (error) {
        handleAccessError(
          error instanceof Error ? error : new Error(String(error))
        );
      }
    };

    startListening();

    return () => {
      isActive = false;
      unsubscribe?.();
    };
  }, [chatId, myUid, peerId, chatLoadAttempt, showToast]);

  const displayName = peerProfile?.name || initialPeerName || 'Bạn bè';
  const isOnline = !!peerProfile?.online;
  const lastSeenText = formatLastSeen(
    isOnline,
    typeof peerProfile?.lastSeen === 'number' ? peerProfile.lastSeen : 0
  );

  const handleSendText = async () => {
    const textToSend = inputText.trim();
    if (!textToSend || !myUid || !peerId) return;

    setInputText('');

    // Optimistic UI: thêm tin nhắn tạm thời
    const tempId = `temp_${Date.now()}`;
    const optimisticMsg: ChatMessage = {
      id: tempId,
      senderId: myUid,
      type: 'text',
      text: textToSend,
      createdAt: Date.now(),
      status: 'sending',
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 50);

    try {
      await sendText(chatId, myUid, peerId, textToSend);
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, status: 'failed' } : m))
      );
      showToast('Gửi thất bại. Nhấn để gửi lại', 'danger');
    }
  };

  const handleRetrySend = async (failedMsg: ChatMessage) => {
    if (!failedMsg.text) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === failedMsg.id ? { ...m, status: 'sending' } : m
      )
    );

    try {
      await sendText(chatId, myUid, peerId, failedMsg.text);
      // Xóa tin tạm
      setMessages((prev) => prev.filter((m) => m.id !== failedMsg.id));
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === failedMsg.id ? { ...m, status: 'failed' } : m
        )
      );
    }
  };

  const handleConfirmLocation = async () => {
    setConfirmLocationVisible(false);
    setIsLocating(true);

    try {
      const coords = await getCurrentLocation();
      await sendLocation(chatId, myUid, peerId, coords);
      showToast('Đã gửi vị trí', 'success');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err: any) {
      if (err instanceof LocationError) {
        if (err.code === 'NEVER_ASK_AGAIN') {
          Alert.alert(
            'Chưa có quyền vị trí',
            'Hãy bật quyền vị trí trong Cài đặt của máy để dùng tính năng này.',
            [
              { text: 'Để sau', style: 'cancel' },
              { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() },
            ]
          );
        } else {
          showToast(err.message, 'warning');
        }
      } else {
        showToast('Không lấy được vị trí. Vui lòng thử lại.', 'danger');
      }
    } finally {
      setIsLocating(false);
    }
  };

  const handleLoadOlder = async () => {
    if (loadingOlder || !hasMore || messages.length === 0) return;
    const firstMsg = messages[0];
    if (!firstMsg.createdAt) return;

    setLoadingOlder(true);
    try {
      const older = await loadOlderMessages(chatId, firstMsg.createdAt, 30);
      if (older.length < 30) {
        setHasMore(false);
      }
      if (older.length > 0) {
        setMessages((prev) => [...older, ...prev]);
      }
    } catch (err) {
      console.warn('loadOlderMessages error:', err);
    } finally {
      setLoadingOlder(false);
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 60;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    isNearBottomRef.current = isAtBottom;
    if (isAtBottom && showScrollBottom) {
      setShowScrollBottom(false);
    }
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
    setShowScrollBottom(false);
  };

  const renderItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const isMe = item.senderId === myUid;
    const prevMsg = index > 0 ? messages[index - 1] : null;
    const nextMsg = index < messages.length - 1 ? messages[index + 1] : null;

    // Phân cách ngày nếu khác ngày với tin trước
    const showDateSeparator =
      !prevMsg || !isSameDay(item.createdAt, prevMsg.createdAt);

    // Gom cụm: tin này là tin cuối của cụm nếu tin tiếp theo khác người gửi hoặc cách nhau > 5 phút
    const isGroupEnd =
      !nextMsg ||
      nextMsg.senderId !== item.senderId ||
      !isWithinMinutes(item.createdAt, nextMsg.createdAt, 5);

    return (
      <View>
        {showDateSeparator && (
          <View style={styles.dateSeparatorContainer}>
            <View style={styles.dateSeparatorChip}>
              <Text style={styles.dateSeparatorText}>
                {formatChatDateSeparator(item.createdAt)}
              </Text>
            </View>
          </View>
        )}

        <MessageBubble
          message={item}
          isMe={isMe}
          peerName={displayName}
          showAvatar={isGroupEnd}
          showTime={isGroupEnd}
          onRetry={handleRetrySend}
          onOpenMapFailed={() =>
            showToast('Không mở được Google Maps', 'warning')
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      {/* Header kiểu Messenger */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <AvatarComponent
            name={displayName}
            uid={peerId}
            size={40}
            online={isOnline}
            showStatus={true}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerName} numberOfLines={1}>
              {displayName}
            </Text>
            <Text
              style={[
                styles.headerStatus,
                isOnline ? styles.statusOnline : styles.statusOffline,
              ]}
              numberOfLines={1}
            >
              {lastSeenText}
            </Text>
          </View>
        </View>

        <View style={styles.headerRightPlaceholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        {loading ? (
          <View style={styles.listContent}>
            {[1, 2, 3, 4].map((i) => (
              <SkeletonItem key={i} type="message" />
            ))}
          </View>
        ) : messages.length === 0 ? (
          chatAccessError ? (
            <EmptyState
              iconName="warning-outline"
              title="Không tải được cuộc trò chuyện"
              description="Kiểm tra Rules của Realtime Database đã được Publish và mở lại cuộc trò chuyện."
              buttonTitle="Thử lại"
              onButtonPress={() => setChatLoadAttempt((attempt) => attempt + 1)}
            />
          ) : (
            <EmptyState
              iconName="chatbubble-ellipses-outline"
              title={`Hãy gửi lời chào đến ${displayName}`}
              description="Bắt đầu cuộc trò chuyện của hai bạn"
            />
          )
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            onScroll={handleScroll}
            scrollEventThrottle={100}
            onContentSizeChange={() => {
              if (isNearBottomRef.current) {
                flatListRef.current?.scrollToEnd({ animated: false });
              }
            }}
            ListHeaderComponent={
              loadingOlder ? (
                <View style={styles.loadingMoreIndicator}>
                  <ActivityIndicator size="small" />
                </View>
              ) : undefined
            }
            onScrollToTop={handleLoadOlder}
            initialNumToRender={20}
            windowSize={10}
          />
        )}

        {/* Nút nổi Tin nhắn mới khi đang đọc tin cũ */}
        {showScrollBottom && (
          <TouchableOpacity
            style={styles.scrollToBottomButton}
            onPress={scrollToBottom}
            activeOpacity={0.8}
          >
            <Text style={styles.scrollToBottomIcon}>↓</Text>
            <Text style={styles.scrollToBottomText}>Tin nhắn mới</Text>
          </TouchableOpacity>
        )}

        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSendText}
          onRequestLocation={() => setConfirmLocationVisible(true)}
          isLocating={isLocating}
        />
      </KeyboardAvoidingView>

      {/* Modal xác nhận gửi vị trí */}
      <Modal
        visible={confirmLocationVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmLocationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>📍</Text>
            <Text style={styles.modalTitle}>Gửi vị trí hiện tại?</Text>
            <Text style={styles.modalDesc}>
              Hai người sẽ cùng xem được vị trí của bạn trên bản đồ.
            </Text>

            <View style={styles.modalButtons}>
              <ButtonComponent
                title="Gửi vị trí"
                onPress={handleConfirmLocation}
              />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setConfirmLocationVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatScreen;
