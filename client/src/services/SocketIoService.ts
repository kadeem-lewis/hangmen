import { io, Socket } from "socket.io-client";

class SocketIoService {
  static instance: null | SocketIoService = null;
  socket: Socket | null = null;

  static getInstance() {
    if (!SocketIoService.instance) {
      SocketIoService.instance = new SocketIoService();
    }
    return SocketIoService.instance;
  }

  setupSocketConnection() {
    if (!this.socket) {
      const serverUrl =
        import.meta.env.VITE_SERVER_URL || "http://localhost:3005";
      this.socket = io(serverUrl, {
        withCredentials: true,
      });
    }
    return this.socket;
  }
}

export default SocketIoService.getInstance();
