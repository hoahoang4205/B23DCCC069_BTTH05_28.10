import {
  ref,
  push,
  update,
  onValue,
  query,
  orderByChild,
  limitToLast,
  endBefore,
  get,
  serverTimestamp,
  increment,
  set,
  Unsubscribe,
} from 'firebase/database';
import { db } from './firebase';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  type: 'text' | 'location';
  text?: string;
  location?: LocationCoords;
  createdAt: number;
  status?: 'sending' | 'sent' | 'failed';
}

export const getChatId = (uidA: string, uidB: string): string => {
  return [uidA, uidB].sort().join('_');
};

export const ensureChatParticipants = async (
  chatId: string,
  myUid: string,
  peerUid: string
): Promise<void> => {
  if (!myUid || !peerUid || myUid === peerUid || chatId !== getChatId(myUid, peerUid)) {
    throw new Error('Thông tin thành viên cuộc trò chuyện không hợp lệ.');
  }

  await set(ref(db, `chats/${chatId}/participants/${myUid}`), true);
  await set(ref(db, `chats/${chatId}/participants/${peerUid}`), true);
};

export const sendText = async (
  chatId: string,
  myUid: string,
  peerUid: string,
  text: string
): Promise<string> => {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('Nội dung tin nhắn không được để trống');
  }

  const messagesRef = ref(db, `chats/${chatId}/messages`);
  const newMsgRef = push(messagesRef);
  const msgKey = newMsgRef.key;

  if (!msgKey) {
    throw new Error('Không tạo được mã tin nhắn');
  }

  await ensureChatParticipants(chatId, myUid, peerUid);

  const messageData = {
    senderId: myUid,
    type: 'text',
    text: trimmed,
    createdAt: serverTimestamp(),
  };

  const updates: Record<string, any> = {};
  updates[`chats/${chatId}/messages/${msgKey}`] = messageData;
  updates[`userChats/${myUid}/${chatId}`] = {
    peerId: peerUid,
    lastMessage: trimmed,
    lastType: 'text',
    lastSenderId: myUid,
    updatedAt: serverTimestamp(),
    unreadCount: 0,
  };
  updates[`userChats/${peerUid}/${chatId}`] = {
    peerId: myUid,
    lastMessage: trimmed,
    lastType: 'text',
    lastSenderId: myUid,
    updatedAt: serverTimestamp(),
    unreadCount: increment(1),
  };

  await update(ref(db), updates);
  return msgKey;
};

export const sendLocation = async (
  chatId: string,
  myUid: string,
  peerUid: string,
  location: LocationCoords
): Promise<string> => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  const newMsgRef = push(messagesRef);
  const msgKey = newMsgRef.key;

  if (!msgKey) {
    throw new Error('Không tạo được mã tin nhắn');
  }

  await ensureChatParticipants(chatId, myUid, peerUid);

  const messageData = {
    senderId: myUid,
    type: 'location',
    location: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    createdAt: serverTimestamp(),
  };

  const updates: Record<string, any> = {};
  updates[`chats/${chatId}/messages/${msgKey}`] = messageData;
  updates[`userChats/${myUid}/${chatId}`] = {
    peerId: peerUid,
    lastMessage: '📍 Vị trí',
    lastType: 'location',
    lastSenderId: myUid,
    updatedAt: serverTimestamp(),
    unreadCount: 0,
  };
  updates[`userChats/${peerUid}/${chatId}`] = {
    peerId: myUid,
    lastMessage: '📍 Vị trí',
    lastType: 'location',
    lastSenderId: myUid,
    updatedAt: serverTimestamp(),
    unreadCount: increment(1),
  };

  await update(ref(db), updates);
  return msgKey;
};

export const subscribeMessages = (
  chatId: string,
  callback: (messages: ChatMessage[]) => void,
  limitCount: number = 50,
  onError?: (error: Error) => void
): Unsubscribe => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  const messagesQuery = query(
    messagesRef,
    orderByChild('createdAt'),
    limitToLast(limitCount)
  );

  const unsubscribe = onValue(
    messagesQuery,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        callback([]);
        return;
      }

      const list: ChatMessage[] = [];
      Object.keys(data).forEach((key) => {
        const item = data[key];
        list.push({
          id: key,
          senderId: item.senderId,
          type: item.type || 'text',
          text: item.text,
          location: item.location,
          createdAt: typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
          status: 'sent',
        });
      });

      // Sắp xếp tăng dần theo createdAt
      list.sort((a, b) => a.createdAt - b.createdAt);
      callback(list);
    },
    (error) => {
      console.warn(`subscribeMessages failed for ${chatId}:`, error);
      onError?.(error);
    }
  );

  return unsubscribe;
};

export const loadOlderMessages = async (
  chatId: string,
  beforeTimestamp: number,
  limitCount: number = 30
): Promise<ChatMessage[]> => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  const olderQuery = query(
    messagesRef,
    orderByChild('createdAt'),
    endBefore(beforeTimestamp),
    limitToLast(limitCount)
  );

  const snapshot = await get(olderQuery);
  const data = snapshot.val();
  if (!data) return [];

  const list: ChatMessage[] = [];
  Object.keys(data).forEach((key) => {
    const item = data[key];
    list.push({
      id: key,
      senderId: item.senderId,
      type: item.type || 'text',
      text: item.text,
      location: item.location,
      createdAt: typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
      status: 'sent',
    });
  });

  list.sort((a, b) => a.createdAt - b.createdAt);
  return list;
};

export const markAsRead = async (myUid: string, chatId: string): Promise<void> => {
  if (!myUid || !chatId) return;
  try {
    const chatRef = ref(db, `userChats/${myUid}/${chatId}`);
    const snapshot = await get(chatRef);
    if (snapshot.exists()) {
      await update(chatRef, {
        unreadCount: 0,
      });
    }
  } catch (error) {
    console.warn(`markAsRead for ${chatId} warning:`, error);
  }
};
