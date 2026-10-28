import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    height: 46,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    marginVertical: spacing.xs,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    color: colors.textSecondary,
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.body,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },
  clearButton: {
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '700',
  },
});
