import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
  headerTextContainer: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  headerName: {
    ...typography.heading,
    fontSize: 16,
    color: colors.textPrimary,
  },
  headerStatus: {
    ...typography.caption,
    fontSize: 12,
  },
  statusOnline: {
    color: colors.success,
    fontWeight: '700',
  },
  statusOffline: {
    color: colors.textSecondary,
  },
  headerRightPlaceholder: {
    width: 44,
  },
  listContent: {
    paddingVertical: spacing.md,
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  dateSeparatorContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dateSeparatorChip: {
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  dateSeparatorText: {
    ...typography.tiny,
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 11,
  },
  scrollToBottomButton: {
    position: 'absolute',
    bottom: 74,
    right: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    ...shadows.soft,
  },
  scrollToBottomIcon: {
    fontSize: 13,
    color: colors.primary,
    marginRight: 4,
    fontWeight: 'bold',
  },
  scrollToBottomText: {
    ...typography.tiny,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  loadingMoreIndicator: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },

  // Modal xác nhận gửi vị trí
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.modal,
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.heading,
    fontSize: 20,
    marginBottom: spacing.xs,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  modalDesc: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  modalButtons: {
    width: '100%',
    gap: spacing.sm,
  },
  cancelButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    ...typography.bodyBold,
    color: colors.textSecondary,
    fontSize: 15,
  },
});
