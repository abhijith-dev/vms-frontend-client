import {Buffer} from 'buffer';

export function setSessionDB(key,value){
   let encryptedData = Buffer.from(value, 'utf8').toString('base64')
   sessionStorage.setItem(key,encryptedData)
}

export function getSessionDB(key){
   let value = sessionStorage.getItem(key)
   if(value === null || value === "" || value === undefined){
      return null
   }
   else{
      let decryptedData = Buffer.from(value, 'base64').toString('utf8')
      return decryptedData
   }
}


export function clear(){
    sessionStorage.clear()
}