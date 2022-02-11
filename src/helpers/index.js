export const l = console.log.bind(window.console)
export const nRandomInt = (n, min, max) => {
  let arr = []
  while(arr.length < n){    
    let r = Math.floor(Math.random()*(max - min + 1) + min)
    if(arr.indexOf(r) === -1) arr.push(r)
  }
  return arr
}