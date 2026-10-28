export const formatMessageTime = (timestamp?: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const isSameDay = (timestamp1?: number, timestamp2?: number): boolean => {
  if (!timestamp1 || !timestamp2) return false;
  const d1 = new Date(timestamp1);
  const d2 = new Date(timestamp2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isWithinMinutes = (
  timestamp1?: number,
  timestamp2?: number,
  maxMinutes: number = 5
): boolean => {
  if (!timestamp1 || !timestamp2) return false;
  const diffMs = Math.abs(timestamp1 - timestamp2);
  return diffMs <= maxMinutes * 60 * 1000;
};

export const formatChatDateSeparator = (timestamp?: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();

  if (isSameDay(timestamp, now.getTime())) {
    return 'Hôm nay';
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(timestamp, yesterday.getTime())) {
    return 'Hôm qua';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatConversationTime = (timestamp?: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();

  if (isSameDay(timestamp, now.getTime())) {
    return formatMessageTime(timestamp);
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(timestamp, yesterday.getTime())) {
    return 'Hôm qua';
  }

  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) {
    const dayNames = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return dayNames[date.getDay()];
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};

export const formatLastSeen = (online?: boolean, lastSeen?: number): string => {
  if (online) {
    return 'Đang hoạt động';
  }
  if (!lastSeen) {
    return 'Ngoại tuyến';
  }

  const now = Date.now();
  const diffSec = Math.floor((now - lastSeen) / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);

  if (diffMin < 1) {
    return 'Vừa mới truy cập';
  }
  if (diffMin < 60) {
    return `Hoạt động ${diffMin} phút trước`;
  }
  if (diffHours < 24) {
    return `Hoạt động ${diffHours} giờ trước`;
  }

  const date = new Date(lastSeen);
  const nowDate = new Date();
  const yesterday = new Date(nowDate);
  yesterday.setDate(nowDate.getDate() - 1);

  if (isSameDay(lastSeen, yesterday.getTime())) {
    return 'Hoạt động hôm qua';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `Hoạt động ${day}/${month}`;
};

export const formatJoinDate = (timestamp?: number): string => {
  if (!timestamp) return '28/10/2026';
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
