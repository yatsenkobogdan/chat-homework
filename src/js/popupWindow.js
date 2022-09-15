export default class popupWindow{
  constructor(){
  }

  showPopup(element){
    const container = document.querySelector('#mainContainer')
    container.appendChild(element)
  }
}