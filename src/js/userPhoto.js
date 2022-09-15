export default class userPhoto{
  constructor(element, loadHandler){
    this.element = element
    this.loadHandler = loadHandler

    this.element.addEventListener('dragover', (e) => {
      if(e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file'){
        e.preventDefault()
      }
    })
    this.element.addEventListener('drop', (e) => {
      const file = e.dataTransfer.items[0].getAsFile()
      const fileReader = new FileReader()

      fileReader.readAsDataURL(file)
      fileReader.addEventListener('load', () => this.loadHandler(fileReader.result))
      e.preventDefault()
    })
  }

  addPhoto(photo){
    this.element.style.backgroundImage = `url(${photo})`
  }
}