import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    height: 72,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    marginRight: spacing.base,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  titleLine: {
    width: '45%',
    height: 16,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
    marginBottom: spacing.xs,
  },
  subtitleLine: {
    width: '75%',
    height: 12,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
  },
  messageBubbleSkeletonMe: {
    alignSelf: 'flex-end',
    width: 180,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
    marginRight: spacing.base,
  },
  messageBubbleSkeletonOther: {
    alignSelf: 'flex-start',
    width: 200,
    height: 54,
    borderRadius: radius.lg,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
    marginLeft: spacing.base,
  },
});
