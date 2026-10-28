export type ToastType = 'success' | 'danger' | 'warning';

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  onDismiss?: () => void;
}
