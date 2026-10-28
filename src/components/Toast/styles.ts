import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 50,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 9999,
  },
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.card,
  },
  success: {
    backgroundColor: colors.success,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    ...typography.bodyBold,
    fontSize: 14,
    color: colors.white,
    flex: 1,
  },
});
