
export default class chatWindow {
  constructor(clickHandler){
    this.clickHandler = clickHandler

    const menu = document.querySelector('#menu')
    menu.addEventListener('click', () => {
      const popupWindow = document.createElement('div')
      popupWindow.innerHTML = ` 
      <div class='w-full min-h-full bg-gray-500 fixed top-0 overflow-hidden z-10 opacity-50' id='photoPopup'>
        <div class='mt-10 mx-auto w-80 h-40 p-3 rounded-md bg-slate-100'>
          test
        </div>
      </div>
      `
      this.clickHandler(popupWindow)
    })
  }

  show(){
    document.querySelector('#chat').classList.remove('hidden')
  }
  
  hide(){
    document.querySelector('#chat').classList.add('hidden')
  }
}