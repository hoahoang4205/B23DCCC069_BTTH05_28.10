import { ref, onValue, Unsubscribe } from 'firebase/database';
import { db } from './firebase';
import { UserProfile } from './authService';

export interface ConversationItem {
  chatId: string;
  peerId: string;
  peerProfile?: UserProfile;
  lastMessage: string;
  lastType: 'text' | 'location';
  lastSenderId: string;
  updatedAt: number;
  unreadCount: number;
}

export const subscribeConversations = (
  myUid: string,
  callback: (conversations: ConversationItem[]) => void
): Unsubscribe => {
  const userChatsRef = ref(db, `userChats/${myUid}`);

  const unsubscribe = onValue(
    userChatsRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        callback([]);
        return;
      }

      const list: ConversationItem[] = [];
      Object.keys(data).forEach((chatId) => {
        const item = data[chatId];
        list.push({
          chatId,
          peerId: item.peerId,
          lastMessage: item.lastMessage || '',
          lastType: item.lastType || 'text',
          lastSenderId: item.lastSenderId || '',
          updatedAt: typeof item.updatedAt === 'number' ? item.updatedAt : Date.now(),
          unreadCount: item.unreadCount || 0,
        });
      });

      // Sắp xếp giảm dần theo updatedAt (mới nhất lên đầu)
      list.sort((a, b) => b.updatedAt - a.updatedAt);
      callback(list);
    },
    (error) => {
      console.error('subscribeConversations error:', error);
      callback([]);
    }
  );

  return unsubscribe;
};
