import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { ContentComponentProps } from './types';
import { styles } from './styles';
import { AvatarComponent } from '../AvatarComponent';

export const ContentComponent: React.FC<ContentComponentProps> = ({
  title,
  subtitle,
  avatarName,
  avatarUid,
  online = false,
  showStatus = true,
  timeText,
  badgeCount = 0,
  unread = false,
  onPress,
  style,
}) => {
  const displayBadge = badgeCount > 99 ? '99+' : badgeCount > 0 ? String(badgeCount) : null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.avatarContainer}>
        <AvatarComponent
          name={avatarName || title}
          uid={avatarUid}
          size={56}
          online={online}
          showStatus={showStatus}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text
            style={[styles.title, unread && styles.titleUnread]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {timeText ? <Text style={styles.timeText}>{timeText}</Text> : null}
        </View>

        <View style={styles.subRow}>
          <Text
            style={[styles.subtitle, unread && styles.subtitleUnread]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
          {displayBadge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{displayBadge}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default ContentComponent;
