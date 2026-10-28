import { StyleSheet } from 'react-native';
import { colors, radius, typography, shadows } from '../../theme';

export const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    minWidth: 44,
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.soft,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  textPrimary: {
    ...typography.bodyBold,
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  textSecondary: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  textGhost: {
    ...typography.bodyBold,
    color: colors.primary,
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});
