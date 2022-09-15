export default class userInfo{
  constructor(element){
    this.element = element
  }

  set(userName){
    this.userName = userName
    this.element.textContent = `${userName}`
  }

  get(){
    return this.userName
  }
}