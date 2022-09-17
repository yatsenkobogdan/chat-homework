export default class userList{
  constructor(element){
    this.element = element
    this.names = new Set()
  }

  update(updateType, userName){
    const usersCount = document.querySelector('#usersCount')
    const fragment = document.createDocumentFragment()

    if (updateType === 'add') {
      this.names.add(userName)
    }
    if (updateType === 'remove') {
      this.names.delete(userName)
    }

    this.element.innerHTML = ''

    for (const name of this.names) {
      const element = document.createElement('div')
      element.innerHTML = `
        <div class='flex flex-row p-3 space-x-4'>
          <div class='flex'>
            <img src='http://localhost:3000/photos/${name}.png' class='h-14 w-14 rounded-full user-${name}'>
          </div>
          <div class='flex text-nickname'>
            ${name}
          </div>
        </div>
      `
      fragment.append(element)
    }
    
    usersCount.textContent = ''
    usersCount.textContent = this.names.size + declOfNum(this.names.size, [' учатник', ' участника', ' участников']);
    this.element.append(fragment)
  }
}

function declOfNum(number, words) {  
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}