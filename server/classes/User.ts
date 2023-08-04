export class User {
  username: string;
  userId: string;
  isHost: boolean;
  currentRoom: string;
  constructor(username: string, userId: string) {
    this.username = username;
    this.userId = userId;
    this.isHost = false;
    this.currentRoom = "";
  }
}
