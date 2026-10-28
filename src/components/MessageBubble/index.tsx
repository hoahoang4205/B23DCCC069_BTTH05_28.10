import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { MessageBubbleProps } from './types';
import { styles } from './styles';
import { AvatarComponent } from '../AvatarComponent';
import { formatMessageTime } from '../../utils/formatTime';

const MessageBubbleComponent: React.FC<MessageBubbleProps> = ({
  message,
  isMe,
  peerName = 'Bạn bè',
  showAvatar = true,
  showTime = true,
  onRetry,
  onOpenMapFailed,
}) => {
  const handleOpenMap = async (lat: number, lng: number) => {
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const nativeUrl = Platform.select({
      ios: `comgooglemaps://?q=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}`,
      default: webUrl,
    });

    try {
      const canOpen = await Linking.canOpenURL(nativeUrl);
      if (canOpen) {
        await Linking.openURL(nativeUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (err) {
      try {
        await Linking.openURL(webUrl);
      } catch (e) {
        onOpenMapFailed?.();
      }
    }
  };

  const renderLocationContent = () => {
    const lat = message.location?.latitude ?? 0;
    const lng = message.location?.longitude ?? 0;
    const latFixed = lat.toFixed(4);
    const lngFixed = lng.toFixed(4);

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleOpenMap(lat, lng)}
        style={[styles.locationCard, isMe && styles.locationCardMe]}
      >
        <View style={styles.mapIllustration}>
          {/* Lưới đường kẻ minh họa bản đồ */}
          <View style={[styles.gridLineH, { top: 30 }]} />
          <View style={[styles.gridLineH, { top: 70 }]} />
          <View style={[styles.gridLineV, { left: 60 }]} />
          <View style={[styles.gridLineV, { left: 140 }]} />
          <View style={[styles.gridLineV, { left: 190 }]} />
          <Ionicons name="location" size={32} color={styles.mapPin.color} />
        </View>

        <View style={styles.locationContent}>
          <Text style={styles.locationTitle} numberOfLines={1}>
            {isMe ? 'Vị trí của bạn' : `Vị trí của ${peerName}`}
          </Text>
          <Text style={styles.locationCoords}>
            {latFixed}, {lngFixed}
          </Text>
          <View style={styles.openMapButton}>
            <Text style={styles.openMapText}>Mở Google Maps</Text>
            <Ionicons
              name="arrow-forward"
              size={14}
              color={styles.openMapText.color}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTextContent = () => {
    return (
      <View style={isMe ? styles.bubbleMe : styles.bubbleOther}>
        <Text
          style={isMe ? styles.textMe : styles.textOther}
          selectable={true}
        >
          {message.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, showTime && styles.containerGroupEnd]}>
      <View style={isMe ? styles.rowMe : styles.rowOther}>
        {!isMe && (
          <View style={styles.avatarContainer}>
            {showAvatar ? (
              <AvatarComponent
                name={peerName}
                uid={message.senderId}
                size={28}
                showStatus={false}
              />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
          </View>
        )}

        <View style={styles.bubbleWrapper}>
          {message.type === 'location' ? renderLocationContent() : renderTextContent()}

          {/* Trạng thái gửi cho tin nhắn của mình */}
          {isMe && message.status === 'sending' && (
            <Text style={styles.statusText}>Đang gửi…</Text>
          )}

          {isMe && message.status === 'failed' && (
            <TouchableOpacity
              style={styles.retryRow}
              onPress={() => onRetry?.(message)}
            >
              <Ionicons
                name="warning-outline"
                size={14}
                color={styles.retryIcon.color}
                style={styles.retryIcon}
              />
              <Text style={styles.retryText}>Gửi thất bại. Nhấn để gửi lại</Text>
            </TouchableOpacity>
          )}

          {/* Giờ hiển thị theo mục 9.2 */}
          {showTime && (
            <Text style={isMe ? styles.timeMe : styles.timeOther}>
              {formatMessageTime(message.createdAt)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const MessageBubble = memo(MessageBubbleComponent);
export default MessageBubble;
