class Message {
  static nextId = 0;
  constructor(sender, text) {
    this.id = ++Message.nextId;
    this.sender = sender;
    this.text = text;
  }
}

module.exports = Message;
