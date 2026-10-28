import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoCircle: {
    width: 84,
    height: 84,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
    ...shadows.soft,
  },
  logoEmoji: {
    fontSize: 42,
  },
  appName: {
    ...typography.title,
    color: colors.primary,
    fontSize: 26,
    letterSpacing: -0.5,
  },
  welcomeSection: {
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
  loginButton: {
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
  registerLink: {
    ...typography.bodyBold,
    fontSize: 14,
    color: colors.primary,
  },
});
