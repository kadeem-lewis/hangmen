export class User {
  username: string;
  userId: string;
  isHost: boolean;
  currentRoom: string;
  isReady: boolean;

  constructor(username: string, userId: string) {
    this.username = username;
    this.userId = userId;
    this.isHost = false;
    this.currentRoom = "";
    this.isReady = false;
  }

  resetUser() {
    this.isHost = false;
    this.isReady = false;
    this.currentRoom = "";
  }
}
