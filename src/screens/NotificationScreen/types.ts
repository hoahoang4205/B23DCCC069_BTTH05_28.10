export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type?: 'system' | 'message' | 'friend';
}

export interface NotificationScreenProps {}
