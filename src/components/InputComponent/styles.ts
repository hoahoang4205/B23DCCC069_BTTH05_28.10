import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
    width: '100%',
  },
  label: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  inputWrapper: {
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
    borderWidth: 1.5,
  },
  inputWrapperError: {
    borderColor: colors.danger,
    backgroundColor: '#fff5f5',
    borderWidth: 1.5,
  },
  leftIconContainer: {
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.body,
    color: colors.textPrimary,
    padding: 0,
  },
  rightIconButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 2,
  },
  errorIcon: {
    marginRight: 4,
    fontSize: 12,
    color: colors.danger,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    fontWeight: '500',
  },
});
