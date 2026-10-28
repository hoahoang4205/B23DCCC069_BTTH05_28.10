import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { EmptyStateProps } from './types';
import { styles } from './styles';
import { ButtonComponent } from '../ButtonComponent';
import { colors } from '../../theme';

export const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = 'chatbubbles-outline',
  title,
  description,
  buttonTitle,
  onButtonPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {!!iconName && (
        <Ionicons
          name={iconName}
          size={64}
          color={colors.primary}
          style={styles.icon}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
      {!!buttonTitle && !!onButtonPress && (
        <ButtonComponent
          title={buttonTitle}
          onPress={onButtonPress}
          style={styles.button}
        />
      )}
    </View>
  );
};

export default EmptyState;
