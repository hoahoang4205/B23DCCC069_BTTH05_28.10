import { ref, onValue, update, onDisconnect, serverTimestamp, Unsubscribe } from 'firebase/database';
import { AppState, AppStateStatus } from 'react-native';
import { db } from './firebase';

let connectedUnsubscribe: Unsubscribe | null = null;
let appStateSubscription: { remove: () => void } | null = null;
let activeUid: string | null = null;

export const startPresence = (uid: string): void => {
  if (!uid) return;
  activeUid = uid;

  const userRef = ref(db, `users/${uid}`);
  const connectedRef = ref(db, '.info/connected');

  // Hủy listener cũ nếu có
  if (connectedUnsubscribe) {
    connectedUnsubscribe();
    connectedUnsubscribe = null;
  }
  if (appStateSubscription) {
    appStateSubscription.remove();
    appStateSubscription = null;
  }

  // Lắng nghe .info/connected
  connectedUnsubscribe = onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      // Khi mất kết nối Firebase tự ghi offline
      onDisconnect(userRef)
        .update({
          online: false,
          lastSeen: serverTimestamp(),
        })
        .then(() => {
          // Khi đang kết nối đặt online = true
          update(userRef, {
            online: true,
          });
        })
        .catch((err) => {
          console.warn('onDisconnect presence setup warning:', err);
        });
    }
  });

  // Lắng nghe trạng thái App (Foreground / Background)
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (!activeUid) return;
    const currentUserRef = ref(db, `users/${activeUid}`);

    if (nextAppState === 'active') {
      update(currentUserRef, {
        online: true,
      }).catch((e) => console.warn('Set online active failed:', e));
    } else {
      update(currentUserRef, {
        online: false,
        lastSeen: serverTimestamp(),
      }).catch((e) => console.warn('Set offline background failed:', e));
    }
  };

  appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
};

export const stopPresence = async (uid: string): Promise<void> => {
  if (connectedUnsubscribe) {
    connectedUnsubscribe();
    connectedUnsubscribe = null;
  }
  if (appStateSubscription) {
    appStateSubscription.remove();
    appStateSubscription = null;
  }

  const targetUid = uid || activeUid;
  activeUid = null;

  if (targetUid) {
    try {
      const userRef = ref(db, `users/${targetUid}`);
      // Hủy onDisconnect trước
      await onDisconnect(userRef).cancel();
      // Đặt offline trước khi signOut
      await update(userRef, {
        online: false,
        lastSeen: serverTimestamp(),
      });
    } catch (err) {
      console.warn('stopPresence set offline error:', err);
    }
  }
};
