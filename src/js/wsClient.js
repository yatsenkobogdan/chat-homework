export default class WSClient{
  constructor(url, messageHandler){
    this.url = url
    this.messageHandler = messageHandler
  }

  connect(){
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url)
      this.socket.addEventListener('open', resolve)
      this.socket.addEventListener('message', (e)=>{
        this.messageHandler(JSON.parse(e.data))
      })
    })
  }

  sendConnect(userName){
    this.sendMessage('userConnected', {userName})
  }

  sendText(textMessage){
    this.sendMessage('text', {textMessage})
  }

  sendMessage(type, data){
    this.socket.send(
      JSON.stringify({type, data})
    )}

}