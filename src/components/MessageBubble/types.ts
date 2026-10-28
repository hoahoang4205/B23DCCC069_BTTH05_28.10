import { ChatMessage } from '../../services/chatService';

export interface MessageBubbleProps {
  message: ChatMessage;
  isMe: boolean;
  peerName?: string;
  showAvatar?: boolean;
  showTime?: boolean;
  onRetry?: (message: ChatMessage) => void;
  onOpenMapFailed?: () => void;
}
