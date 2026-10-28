import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { ChatInputProps } from './types';
import { styles } from './styles';
import { colors } from '../../theme';

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  onRequestLocation,
  isLocating = false,
  disabled = false,
}) => {
  const isSendDisabled = disabled || !value.trim();

  const handleSend = () => {
    if (isSendDisabled) return;
    try {
      Vibration.vibrate(20);
    } catch (e) {
      // Ignored
    }
    onSend();
  };

  return (
    <View style={styles.container}>
      {value.length > 900 && (
        <Text style={styles.counterText}>{value.length}/1000</Text>
      )}

      <View style={styles.innerRow}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={onRequestLocation}
          disabled={disabled || isLocating}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {isLocating ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Ionicons
              name="location-outline"
              size={22}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder="Nhắn tin..."
            placeholderTextColor={colors.textSecondary}
            multiline={true}
            maxLength={1000}
            editable={!disabled}
          />
        </View>

        <TouchableOpacity
          style={[styles.sendButton, isSendDisabled && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={isSendDisabled}
          activeOpacity={0.8}
        >
          <Ionicons
            name="send"
            size={18}
            color={isSendDisabled ? '#9ca3af' : colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;
