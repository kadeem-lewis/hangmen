export class User {
  username: string;
  userId: string;
  isHost: boolean;
  isReady: boolean;

  constructor(username: string, userId: string) {
    this.username = username;
    this.userId = userId;
    this.isHost = false;
    this.isReady = false;
  }

  resetUser() {
    this.isHost = false;
    this.isReady = false;
  }
}
