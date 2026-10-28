import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import { ButtonComponentProps } from './types';
import { styles } from './styles';
import { colors } from '../../theme';

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
}) => {
  const isDisabled = disabled || loading;

  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'ghost':
        return styles.ghost;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'ghost':
        return styles.textGhost;
      default:
        return styles.textPrimary;
    }
  };

  const getSpinnerColor = () => {
    switch (variant) {
      case 'secondary':
        return colors.textPrimary;
      case 'ghost':
        return colors.primary;
      default:
        return colors.white;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        getVariantStyle(),
        isDisabled && styles.disabled,
        pressed && !isDisabled && { transform: [{ scale: 0.96 }] },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getSpinnerColor()} />
      ) : (
        <>
          {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
};

export default ButtonComponent;
