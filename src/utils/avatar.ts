const PASTEL_COLORS = [
  '#f43f5e', // rose
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#10b981', // emerald
  '#f59e0b', // amber
  '#3b82f6', // blue
];

export const getInitials = (name?: string): string => {
  if (!name) return '?';
  const clean = name.trim();
  if (!clean) return '?';

  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  // Lấy ký tự đầu của họ và tên hoặc từ cuối cùng
  const lastPart = parts[parts.length - 1];
  return lastPart.charAt(0).toUpperCase();
};

export const getAvatarColor = (uid?: string): string => {
  if (!uid) return PASTEL_COLORS[0];
  let hash = 0;
  for (let i = 0; i < uid.length; i++) {
    hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PASTEL_COLORS.length;
  return PASTEL_COLORS[index];
};

/**
 * Bỏ dấu tiếng Việt và chuyển sang chữ thường không phân biệt hoa/thường:
 * normalize('NFD').replace(/[\u0300-\u036f]/g, '') và thay đ/Đ thành d
 */
export const removeVietnameseTones = (str: string): string => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .trim();
};
