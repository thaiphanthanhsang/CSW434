import { io } from 'socket.io-client';

// 10.0.2.2 là địa chỉ máy tính khi chạy Android Emulator.
// Nếu chạy máy thật, đổi thành IP máy tính (ipconfig trên Windows, ifconfig trên Mac).
const SERVER_URL = 'http://10.0.2.2:3000';

export const socket = io(SERVER_URL, {
  autoConnect: false, // Chỉ kết nối khi vào màn hình chat
});
