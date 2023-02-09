class Message {
  static nextId = 0;
  constructor(id, sender, text) {
    this.id = ++nextId;
    this.sender = sender;
    this.text = text;
  }
}
