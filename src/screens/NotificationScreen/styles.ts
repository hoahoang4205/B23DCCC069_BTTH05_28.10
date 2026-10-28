import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.base,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  headerTitle: {
    ...typography.title,
    fontSize: 28,
    color: colors.textPrimary,
  },
  markAllText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.base,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    ...shadows.card,
  },
  itemUnread: {
    borderColor: '#c7d2fe',
    backgroundColor: colors.primarySoft,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  iconText: {
    fontSize: 20,
  },
  contentWrapper: {
    flex: 1,
  },
  itemTitle: {
    ...typography.bodyBold,
    fontSize: 15,
    marginBottom: 2,
    color: colors.textPrimary,
  },
  itemDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
    lineHeight: 18,
  },
  itemTime: {
    ...typography.tiny,
    color: colors.textSecondary,
    fontSize: 11,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginLeft: spacing.sm,
  },
});
