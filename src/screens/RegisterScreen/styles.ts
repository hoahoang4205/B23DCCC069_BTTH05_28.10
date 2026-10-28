import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.base,
    paddingBottom: spacing.xxl,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  backIcon: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  headerSection: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.title,
    fontSize: 26,
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  formSection: {
    width: '100%',
  },
  iconPrefix: {
    fontSize: 18,
  },
  // Strength Indicator
  strengthContainer: {
    marginTop: -spacing.xs,
    marginBottom: spacing.base,
  },
  strengthBarsRow: {
    flexDirection: 'row',
    height: 5,
    gap: 6,
    marginBottom: 6,
  },
  strengthBar: {
    flex: 1,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.borderStrong,
  },
  strengthBarWeak: {
    backgroundColor: colors.danger,
  },
  strengthBarMedium: {
    backgroundColor: colors.warning,
  },
  strengthBarStrong: {
    backgroundColor: colors.success,
  },
  strengthText: {
    ...typography.tiny,
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 12,
  },
  errorBanner: {
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1.2,
    borderColor: '#fca5a5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorBannerIcon: {
    fontSize: 16,
    color: colors.danger,
    marginRight: spacing.sm,
  },
  errorBannerText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.danger,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  registerButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
  loginLink: {
    ...typography.bodyBold,
    fontSize: 14,
    color: colors.primary,
  },
});
