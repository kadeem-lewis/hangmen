import { io } from "socket.io-client";

class SocketIoService {
  static instance = null;
  socket = null;

  static getInstance() {
    if (!SocketIoService.instance) {
      SocketIoService.instance = new SocketIoService();
    }
    return SocketIoService.instance;
  }

  setupSocketConnection() {
    if (!this.socket) {
      const serverUrl = import.meta.env.SERVER_URL || "http://localhost:3005";
      this.socket = io(serverUrl);
    }
    return this.socket;
  }
}

export default SocketIoService.getInstance();
