import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { ref, get, set, serverTimestamp } from 'firebase/database';
import { auth, db } from './firebase';
import { stopPresence } from './presenceService';

export interface UserProfile {
  uid: string;
  name: string;
  nameLower: string;
  email: string;
  createdAt: number | object;
  online: boolean;
  lastSeen: number | object;
}

export const mapAuthError = (codeOrMessage: string): string => {
  const str = (codeOrMessage || '').toLowerCase();

  if (str.includes('api-key-not-valid') || str.includes('invalid-api-key')) {
    return 'Firebase chưa được cấu hình đúng. Hãy sao chép toàn bộ firebaseConfig của ứng dụng Web trong Firebase Console vào src/services/firebaseConfig.ts, không chỉ apiKey.';
  }
  if (str.includes('operation-not-allowed') || str.includes('admin-restricted-operation')) {
    return 'Chưa bật Email/Password! Vào Firebase Console -> Authentication -> Sign-in method để bật.';
  }
  if (str.includes('configuration-not-found')) {
    return 'Firebase Authentication chưa được thiết lập cho project. Vào Firebase Console -> Authentication -> Get started, rồi bật Email/Password.';
  }
  if (str.includes('password-does-not-meet-requirements')) {
    return 'Mật khẩu chưa đáp ứng chính sách mật khẩu của Firebase. Hãy đặt mật khẩu mạnh hơn theo yêu cầu của project.';
  }
  if (str.includes('invalid-credential') || str.includes('wrong-password') || str.includes('user-not-found')) {
    return 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.';
  }
  if (str.includes('email-already-in-use')) {
    return 'Email này đã được đăng ký';
  }
  if (str.includes('invalid-email')) {
    return 'Email không hợp lệ';
  }
  if (str.includes('weak-password')) {
    return 'Mật khẩu quá yếu, hãy dùng ít nhất 6 ký tự';
  }
  if (str.includes('user-disabled')) {
    return 'Tài khoản đã bị vô hiệu hóa';
  }
  if (str.includes('too-many-requests')) {
    return 'Bạn thử quá nhiều lần. Vui lòng thử lại sau ít phút.';
  }
  if (str.includes('network-request-failed')) {
    return 'Không có kết nối mạng. Kiểm tra Wi-Fi/4G rồi thử lại.';
  }
  if (str.includes('permission-denied') || str.includes('permission_denied')) {
    return 'Bạn không có quyền truy cập cơ sở dữ liệu. Kiểm tra Rules của Realtime Database.';
  }

  if (codeOrMessage) {
    return `Lỗi Firebase (${codeOrMessage.slice(0, 120)}). Kiểm tra cấu hình Authentication, Realtime Database và Rules.`;
  }
  return 'Không nhận được mã lỗi từ Firebase. Kiểm tra kết nối mạng và cấu hình project.';
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  const credential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  const user = credential.user;

  try {
    await updateProfile(user, { displayName: cleanName });
  } catch (err) {
    console.warn('Update profile displayName warning:', err);
  }

  const userProfile: UserProfile = {
    uid: user.uid,
    name: cleanName,
    nameLower: cleanName.toLowerCase(),
    email: cleanEmail,
    createdAt: serverTimestamp(),
    online: true,
    lastSeen: serverTimestamp(),
  };

  const userRef = ref(db, `users/${user.uid}`);
  await set(userRef, userProfile);

  return user;
};

export const login = async (email: string, password: string): Promise<User> => {
  const cleanEmail = email.trim().toLowerCase();
  const credential = await signInWithEmailAndPassword(auth, cleanEmail, password);
  const user = credential.user;

  // Đảm bảo hồ sơ users/{uid} tồn tại (nếu thiếu thì tạo)
  try {
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      const name = user.displayName || cleanEmail.split('@')[0];
      await set(userRef, {
        uid: user.uid,
        name,
        nameLower: name.toLowerCase(),
        email: cleanEmail,
        createdAt: serverTimestamp(),
        online: true,
        lastSeen: serverTimestamp(),
      });
    }
  } catch (e) {
    console.warn('Check profile on login warning:', e);
  }

  return user;
};

export const logout = async (): Promise<void> => {
  const currentUid = auth.currentUser?.uid;
  if (currentUid) {
    try {
      await stopPresence(currentUid);
    } catch (e) {
      console.warn('stopPresence before logout failed:', e);
    }
  }
  await signOut(auth);
};

export const subscribeAuth = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback);
};
