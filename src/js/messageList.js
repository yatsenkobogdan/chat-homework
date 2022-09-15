export default class messageList{
  constructor(element){
    this.element = element
  }


  addUserMessage(messageAuthor, message){
    const date = new Date()
    const time = padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes())
    const container = document.createElement('div')

    container.innerHTML = `
    <div class='flex flex-row p-3'>
      <div data-photo='avatar' data-user=${messageAuthor}>
      </div>
      <div class='flex flex-col ml-2'>
        <div class='flex text-base text-nickname'>
          ${messageAuthor}
        </div>
        <div class='flex flex-row'>
          <div class='flex'>
            ${message}
          </div>
          <div class='flex ml-2 text-custom-gray'>
             ${time}
          </div>
        </div>
      </div>
    </div>
    `
    this.element.append(container)
    this.element.scrollTop = this.element.scrollHeight
  }

  addSystemMessage(message){
    const element = document.createElement('div')

    element.classList.add('text-custom-gray', 'mt-1')
    element.textContent = message
    this.element.append(element)
    this.element.scrollTop = this.element.scrollHeight
  }
}

const padTo2Digits = (number) => String(number).padStart(2,'0'); 