import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 1.5,
    paddingHorizontal: spacing.base,
    width: '100%',
  },
  containerGroupEnd: {
    marginBottom: spacing.sm,
  },
  rowMe: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  rowOther: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  avatarPlaceholder: {
    width: 28,
    marginRight: spacing.xs,
  },
  avatarContainer: {
    marginRight: spacing.xs,
    marginBottom: 2,
  },
  bubbleWrapper: {
    maxWidth: '75%',
  },
  bubbleMe: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    borderBottomRightRadius: 4,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 2,
    ...shadows.soft,
  },
  bubbleOther: {
    backgroundColor: colors.bubbleOther,
    borderRadius: radius.lg,
    borderBottomLeftRadius: 4,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 2,
  },
  textMe: {
    ...typography.body,
    fontSize: 15,
    color: colors.white,
    lineHeight: 22,
  },
  textOther: {
    ...typography.body,
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  timeMe: {
    ...typography.tiny,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 3,
    fontSize: 11,
  },
  timeOther: {
    ...typography.tiny,
    color: colors.textSecondary,
    textAlign: 'left',
    marginTop: 3,
    fontSize: 11,
  },
  statusText: {
    ...typography.tiny,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 2,
    fontStyle: 'italic',
  },
  retryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  retryIcon: {
    fontSize: 12,
    color: colors.danger,
    marginRight: 4,
  },
  retryText: {
    ...typography.tiny,
    color: colors.danger,
    fontWeight: '600',
  },

  // Location Card
  locationCard: {
    width: 240,
    borderRadius: radius.lg,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.white,
    overflow: 'hidden',
    ...shadows.card,
  },
  locationCardMe: {
    borderColor: colors.primary,
  },
  mapIllustration: {
    height: 115,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#c7d2fe',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#c7d2fe',
  },
  mapPin: {
    fontSize: 34,
    color: colors.danger,
    zIndex: 2,
  },
  locationContent: {
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  locationTitle: {
    ...typography.bodyBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  locationCoords: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  openMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openMapText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
});
