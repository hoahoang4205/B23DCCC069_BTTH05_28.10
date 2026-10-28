import React from 'react';
import { View, Text } from 'react-native';
import { AvatarComponentProps } from './types';
import { styles } from './styles';
import { getAvatarColor, getInitials } from '../../utils/avatar';

export const AvatarComponent: React.FC<AvatarComponentProps> = ({
  name = '',
  uid = '',
  size = 56,
  online = false,
  showStatus = false,
  style,
}) => {
  const initial = getInitials(name);
  const bgColor = getAvatarColor(uid || name);
  const fontSize = Math.max(12, Math.round(size * 0.42));
  const dotSize = Math.max(10, Math.round(size * 0.25));

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <View
        style={[
          styles.avatarCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bgColor,
          },
        ]}
      >
        <Text style={[styles.initialText, { fontSize }]}>{initial}</Text>
      </View>
      {showStatus && (
        <View
          style={[
            styles.statusDot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
            },
            online ? styles.online : styles.offline,
          ]}
        />
      )}
    </View>
  );
};

export default AvatarComponent;
