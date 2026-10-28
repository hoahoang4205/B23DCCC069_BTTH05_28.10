import { ref, onValue, set, Unsubscribe } from 'firebase/database';
import { db } from './firebase';
import { UserProfile } from './authService';

export const createProfile = async (
  uid: string,
  profile: Partial<UserProfile>
): Promise<void> => {
  const userRef = ref(db, `users/${uid}`);
  await set(userRef, profile);
};

export const subscribeUsers = (
  myUid: string,
  callback: (users: UserProfile[]) => void
): Unsubscribe => {
  const usersRef = ref(db, 'users');

  const unsubscribe = onValue(
    usersRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        callback([]);
        return;
      }

      const userList: UserProfile[] = [];
      Object.keys(data).forEach((key) => {
        if (key !== myUid) {
          const u = data[key];
          userList.push({
            uid: u.uid || key,
            name: u.name || 'Người dùng',
            nameLower: u.nameLower || (u.name || '').toLowerCase(),
            email: u.email || '',
            createdAt: u.createdAt || 0,
            online: !!u.online,
            lastSeen: u.lastSeen || 0,
          });
        }
      });

      // Sắp xếp: online trước, offline sau; cùng trạng thái theo tên A->Z
      userList.sort((a, b) => {
        if (a.online === b.online) {
          return a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' });
        }
        return a.online ? -1 : 1;
      });

      callback(userList);
    },
    (error) => {
      console.error('subscribeUsers error:', error);
      callback([]);
    }
  );

  return unsubscribe;
};

export const subscribeUser = (
  uid: string,
  callback: (user: UserProfile | null) => void
): Unsubscribe => {
  const userRef = ref(db, `users/${uid}`);

  const unsubscribe = onValue(
    userRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        callback(null);
        return;
      }
      callback({
        uid: data.uid || uid,
        name: data.name || 'Người dùng',
        nameLower: data.nameLower || (data.name || '').toLowerCase(),
        email: data.email || '',
        createdAt: data.createdAt || 0,
        online: !!data.online,
        lastSeen: data.lastSeen || 0,
      });
    },
    (error) => {
      console.error(`subscribeUser(${uid}) error:`, error);
      callback(null);
    }
  );

  return unsubscribe;
};
