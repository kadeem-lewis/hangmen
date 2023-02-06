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
      this.socket = io("http://localhost:3005");
    }
    return this.socket;
  }
}

export default SocketIoService.getInstance();
