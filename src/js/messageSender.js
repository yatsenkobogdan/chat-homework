export default class messageSender{
  constructor(messageHandler){
    this.messageHandler = messageHandler
    
    const button = document.querySelector('#chatButton')
    const input = document.querySelector('#chatInput')

    input.addEventListener('keydown', (e) => {
      if(e.keyCode !== 13) {
        return;
      }

      const message = input.value.trim()
      
      if(message){
        messageHandler(message)
      }
    })

    button.addEventListener('click', () => {
      const message = input.value.trim()

      if(message){
        messageHandler(message)
      }
    })
  }
  clear(){
    document.querySelector('#chatInput').value = ''
  }
}