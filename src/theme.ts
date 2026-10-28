import { Platform, TextStyle } from 'react-native';

export const colors = {
  primary: '#6366f1',       // Tím Indigo tươi sáng hiện đại
  primaryDark: '#4f46e5',
  primarySoft: '#eff2fe',   // Tím nhạt siêu sáng sạch sẽ
  accent: '#f43f5e',        // Hồng rực rỡ nổi bật
  background: '#ffffff',    // Trắng tinh 100%
  surface: '#ffffff',       // Trắng tinh
  surfaceSoft: '#f8fafc',   // Xám ngọc sáng tinh tế cho input, ô tìm kiếm
  surfaceHover: '#f1f5f9',  // Khi bấm hoặc hover
  bubbleOther: '#f1f5f9',   // Bong bóng người kia xám nhạt trong trẻo
  textPrimary: '#0f172a',   // Đen than đậm sắc nét tương phản cao
  textSecondary: '#64748b', // Xám xanh hiện đại, dễ đọc
  textMuted: '#94a3b8',     // Xám nhạt cho placeholder
  border: '#f1f5f9',        // Đường kẻ siêu mảnh
  borderStrong: '#e2e8f0',  // Viền ô nhập, card
  borderFocus: '#818cf8',   // Viền khi focus
  success: '#10b981',       // Xanh ngọc online rạng rỡ
  danger: '#ef4444',        // Đỏ tươi
  warning: '#f59e0b',       // Vàng cam
  offline: '#94a3b8',       // Xám offline
  disabled: '#cbd5e1',
  white: '#ffffff',
  black: '#000000',
  dangerSoft: '#fef2f2',
  warningSoft: '#fffbeb',
  successSoft: '#ecfdf5',
};

// Cấu hình font Be Vietnam Pro
const fontFamily = Platform.select({
  ios: 'Be Vietnam Pro',
  android: 'BeVietnamPro-Regular',
  default: 'sans-serif',
});

const fontMedium = Platform.select({
  ios: 'Be Vietnam Pro Medium',
  android: 'BeVietnamPro-Medium',
  default: 'sans-serif-medium',
});

const fontBold = Platform.select({
  ios: 'Be Vietnam Pro Bold',
  android: 'BeVietnamPro-Bold',
  default: 'sans-serif-medium',
});

export const typography: Record<string, TextStyle> = {
  title: {
    fontFamily: fontBold,
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.6,
    lineHeight: 38,
  },
  heading: {
    fontFamily: fontBold,
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: fontBold,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 23,
  },
  caption: {
    fontFamily: fontMedium,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tiny: {
    fontFamily: fontBold,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    lineHeight: 16,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  full: 999,
};

export const shadows = {
  soft: {
    ...Platform.select({
      ios: {
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  card: {
    ...Platform.select({
      ios: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  modal: {
    ...Platform.select({
      ios: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
};
