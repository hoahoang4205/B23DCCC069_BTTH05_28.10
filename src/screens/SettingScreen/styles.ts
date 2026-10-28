import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.background,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    ...shadows.card,
  },
  profileAvatar: {
    marginBottom: spacing.md,
  },
  profileName: {
    ...typography.heading,
    fontSize: 22,
    marginBottom: 4,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  profileEmail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
    fontSize: 14,
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  activeText: {
    ...typography.tiny,
    color: colors.success,
    fontWeight: '800',
    fontSize: 12,
  },
  sectionTitle: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    fontSize: 12,
  },
  cardGroup: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    ...shadows.card,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowItemLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    ...typography.body,
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  rowValue: {
    ...typography.body,
    fontSize: 15,
    color: colors.textSecondary,
  },
  logoutButton: {
    borderColor: '#fca5a5',
    backgroundColor: '#fff5f5',
    marginTop: spacing.sm,
  },
  logoutButtonText: {
    color: colors.danger,
    fontWeight: '700',
  },
  logoutIcon: {
    fontSize: 18,
    color: colors.danger,
  },
});
