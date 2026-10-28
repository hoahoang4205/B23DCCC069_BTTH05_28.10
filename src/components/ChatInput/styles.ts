import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  locationButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
    backgroundColor: colors.surfaceSoft,
  },
  locationIcon: {
    fontSize: 22,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: colors.surfaceSoft,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
    marginRight: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  input: {
    ...typography.body,
    fontSize: 15,
    color: colors.textPrimary,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 0,
  },
  counterText: {
    ...typography.tiny,
    color: colors.warning,
    textAlign: 'right',
    marginTop: 2,
    marginRight: 4,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.soft,
  },
  sendButtonDisabled: {
    backgroundColor: colors.disabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  sendIcon: {
    fontSize: 18,
    color: colors.white,
    marginLeft: 2,
  },
  sendIconDisabled: {
    color: '#94a3b8',
  },
});
