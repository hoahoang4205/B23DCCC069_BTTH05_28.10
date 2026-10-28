import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
  getAuth,
  Auth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, Database } from 'firebase/database';
import { firebaseConfig } from './firebaseConfig';

let app: FirebaseApp;
let auth: Auth;
let db: Database;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    auth = getAuth(app);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

db = getDatabase(app);

export { app, auth, db };
