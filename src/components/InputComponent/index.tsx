import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { InputComponentProps } from './types';
import { styles } from './styles';
import { colors } from '../../theme';

export const InputComponent = forwardRef<any, InputComponentProps>(
  (
    {
      label,
      error,
      leftIcon,
      isPassword = false,
      containerStyle,
      onFocus,
      onBlur,
      ...textInputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputWrapper,
            isFocused && styles.inputWrapperFocused,
            !!error && styles.inputWrapperError,
          ]}
        >
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={colors.textSecondary}
            secureTextEntry={isPassword && !showPassword}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...textInputProps}
          />
          {isPassword && (
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.rightIconButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
        {!!error && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="warning-outline"
              size={15}
              color={colors.danger}
              style={styles.errorIcon}
            />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
);

InputComponent.displayName = 'InputComponent';
export default InputComponent;
