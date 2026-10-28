import { useState, useCallback, useRef } from 'react';

export type ToastType = 'success' | 'danger' | 'warning';

export interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

export interface UseToastReturn {
  toast: ToastState;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

export const useToast = (): UseToastReturn => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success',
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'success', duration: number = 3000) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setToast({
        visible: true,
        message,
        type,
      });

      timerRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    },
    [hideToast]
  );

  return { toast, showToast, hideToast };
};
