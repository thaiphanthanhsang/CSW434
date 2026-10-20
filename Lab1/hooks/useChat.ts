import { useCallback, useEffect, useState } from 'react';
import { socket } from '../socket';
import type { Message } from '../types';

/** Kết nối server, vào phòng chat và quản lý danh sách tin nhắn. */
export const useChat = (username: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      setMessages(prev => [...prev, message]);
    };

    socket.on('message_received', handleMessage);
    socket.connect();
    socket.emit('join_room', username);

    return () => {
      socket.off('message_received', handleMessage);
      socket.disconnect();
    };
  }, [username]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (trimmed) {
        socket.emit('send_message', { text: trimmed, user: username });
      }
    },
    [username],
  );

  return { messages, sendMessage };
};
