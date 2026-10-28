import React, { useEffect, useRef } from 'react';
import { Text, Animated } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import type { IoniconsIconName } from '@react-native-vector-icons/ionicons/static';
import { ToastProps } from './types';
import { styles } from './styles';

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'success',
}) => {
  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -80,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity]);

  if (!visible) return null;

  const getTypeStyle = () => {
    switch (type) {
      case 'danger':
        return styles.danger;
      case 'warning':
        return styles.warning;
      default:
        return styles.success;
    }
  };

  const getIcon = (): IoniconsIconName => {
    switch (type) {
      case 'danger':
        return 'close-circle';
      case 'warning':
        return 'warning';
      default:
        return 'checkmark-circle';
    }
  };

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrapper,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Animated.View style={[styles.container, getTypeStyle()]}>
        <Ionicons
          name={getIcon()}
          size={18}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Toast;
