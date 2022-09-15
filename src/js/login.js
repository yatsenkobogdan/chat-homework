export default class login{
  constructor(loginHandler){
    this.loginHandler = loginHandler

    const container = document.querySelector('#login')

    const button = container.querySelector('#loginSubmitButton')
    const errorsContainer = container.querySelector('#loginErrorsContainer')
    const userName = container.querySelector('#loginUserName')

    container.addEventListener('input', function(e) {
      errorsContainer.classList.add('hidden')
    })

    button.addEventListener('click', () => {
      if(userName.value.trim() === ''){
        this.show(errorsContainer)
      }
      else{
        this.loginHandler(userName.value)
      }
    })

  }

  show(element = document.querySelector('#login')) {
    element.classList.remove('hidden')
  }

  hide() {
    document.querySelector('#login').classList.add('hidden')
  }
}