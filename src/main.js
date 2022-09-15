import chatWindow from "./js/chatWindow";
import login from "./js/login"
import userInfo from "./js/userInfo";
import userList from "./js/userList";
import WSClient from "./js/wsClient";
import messageList from "./js/messageList";
import messageSender from "./js/messageSender";
import popupWindow from "./js/popupWindow";
import userPhoto from "./js/userPhoto";

export default class mainObject{
  constructor(){
    this.wsClient = new WSClient(
      `ws://localhost:3000/ws`,
      this.messageHandler.bind(this)
    )
    
    this.element = {
      login: new login(this.loginHandler.bind(this)),
      chatWindow: new chatWindow(this.showPopup.bind(this)),
      userInfo: new userInfo(document.querySelector('#userName')),
      userList: new userList(document.querySelector('#userList')),
      userPhoto: new userPhoto(document.querySelector('#userPhoto'), this.imageLoadHandler.bind(this)),
      messageList: new messageList(document.querySelector('#messageList')),
      messageSender: new messageSender(this.onSend.bind(this)),
      popupWindow: new popupWindow(),
    }

    this.element.login.show()
  }

  onSend(message) {
    this.wsClient.sendText(message)
    this.element.messageSender.clear()
  }

  async loginHandler (name) {
    await this.wsClient.connect()
    this.wsClient.sendConnect(name)
    this.element.login.hide()
    this.element.chatWindow.show()
    this.element.userInfo.set(name)
    this.element.userPhoto.addPhoto(`photos/${name}.png?t=${Date.now()}`)
  }

  showPopup(element){
  }

  imageLoadHandler(data){
    this.element.userPhoto.addPhoto(data)

    fetch('http://localhost:3000/upload-photo', {
      method: 'post',
      body: JSON.stringify({
        name: this.element.userInfo.get(),
        image: data
      })
    })
  }

  messageHandler({type, user, data, from}){
    switch(type){
      case 'userConnected': 
        this.element.userList.update('add', data.userName)
        this.element.messageList.addSystemMessage(`${data.userName} вошел в чат`)
        break;
      case 'userDisconnected':
        this.element.userList.update('remove', from)
        this.element.messageList.addSystemMessage(`${from} вышел из чата`)
        break;
      case 'text':
        this.element.messageList.addUserMessage(from, data.textMessage)
        break;
      case 'users':
        for (const user of data) {
          this.element.userList.update('add', user)
        }
        break;
      case 'photo-changed':
        const avatars = document.querySelectorAll(`[data-photo=avatar][data-user=${data.name}]`)
        for (const avatar of avatars) {
          avatar.style.backgroundImage = `url(/photos/${data.name}.png?t=${Date.now()})`
        }
    }
  }
} 