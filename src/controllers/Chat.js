import viewMessage from '../views/message';
import botsData from '../data/botsData.json';
import Commands from './Commands';
// import commandsData from '../data/commandsData.json';

const Chat = class {
  constructor() {
    this.el = document.querySelector('.messages-section');

    this.messages = [];
    this.bots = botsData;

    this.scrollToBottom();

    const elSendButton = document.querySelector('.send-message');
    elSendButton.addEventListener('click', () => {
      this.userSendMessage();
    });

    document.addEventListener('keyup', (e) => {
      if (e.code === 'Enter') {
        this.userSendMessage();
      }
    });
  }

  userSendMessage() {
    const elInputMessageContent = document.querySelector('.input-message-content');

    if (elInputMessageContent.value.length === 0) return;

    this.sendMessage({
      sender: 'User',
      receiver: 'Bot',
      date: new Date(),
      content: elInputMessageContent.value,
      avatar: 'https://source.boringavatars.com/'
    });
    elInputMessageContent.value = '';
  }

  sendMessage(messageData) {
    const {
      sender, receiver, date, content, avatar
    } = messageData;

    const messageToSend = {
      sender,
      receiver,
      date,
      content,
      avatar
    };

    this.messages.push(messageToSend);
    this.updateLocalStorage(messageToSend);

    this.run(messageToSend);

    // Check if this message is a command
    new Commands(this, messageToSend);

    this.scrollToBottom();
  }

  updateLocalStorage(newData) {
    let data = localStorage.getItem('messages') || '[]';
    data = JSON.parse(data);

    if (!data.includes(newData)) {
      data.push(newData);
    }

    localStorage.setItem('messages', JSON.stringify(data));
  }

  showOldMessages() {
    let data = localStorage.getItem('messages') || '[]';
    data = JSON.parse(data);

    data.forEach((message) => {
      this.sendMessage(message);
    });
  }

  scrollToBottom() {
    const elRightSide = document.querySelector('.messages-section');
    elRightSide.scrollTo(0, elRightSide.scrollHeight);
  }

  render(messageData) {
    return viewMessage(messageData);
  }

  run(messageData) {
    this.el.innerHTML += this.render(messageData);
  }
};

export default Chat;