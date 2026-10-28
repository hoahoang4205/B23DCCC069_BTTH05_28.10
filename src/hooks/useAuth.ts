import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { subscribeAuth } from '../services/authService';
import { startPresence, stopPresence } from '../services/presenceService';

export interface UseAuthReturn {
  user: User | null;
  initializing: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeAuth((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        startPresence(currentUser.uid);
      }
      setInitializing(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, initializing };
};
