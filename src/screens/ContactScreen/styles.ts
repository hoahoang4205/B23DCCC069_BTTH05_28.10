import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

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
  onlineChip: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  onlineChipText: {
    ...typography.tiny,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xs,
    backgroundColor: colors.background,
  },
  offlineBanner: {
    backgroundColor: colors.warningSoft,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineBannerText: {
    ...typography.caption,
    color: colors.warning,
    fontWeight: '600',
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
});
