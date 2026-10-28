import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    height: 76,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.primarySoft,
  },
  avatarContainer: {
    marginRight: spacing.base,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    ...typography.bodyBold,
    fontSize: 16,
    flex: 1,
    marginRight: spacing.sm,
    color: colors.textPrimary,
  },
  titleUnread: {
    fontWeight: '800',
    color: colors.black,
  },
  timeText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    ...typography.caption,
    fontSize: 14,
    flex: 1,
    marginRight: spacing.sm,
    color: colors.textSecondary,
  },
  subtitleUnread: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    ...typography.tiny,
    color: colors.white,
    fontWeight: '800',
    fontSize: 11,
  },
});
