export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onRequestLocation: () => void;
  isLocating?: boolean;
  disabled?: boolean;
}
