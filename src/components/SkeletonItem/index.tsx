import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { SkeletonItemProps } from './types';
import { styles } from './styles';

export const SkeletonItem: React.FC<SkeletonItemProps> = ({
  style,
  type = 'contact',
}) => {
  const opacityAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacityAnim]);

  if (type === 'message') {
    return (
      <Animated.View style={[{ opacity: opacityAnim }, style]}>
        <View style={styles.messageBubbleSkeletonOther} />
        <View style={styles.messageBubbleSkeletonMe} />
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }, style]}>
      <View style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.titleLine} />
        <View style={styles.subtitleLine} />
      </View>
    </Animated.View>
  );
};

export default SkeletonItem;
