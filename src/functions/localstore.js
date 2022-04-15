import {Buffer} from 'buffer';

export function setLocalDB(key,value){
   let encryptedData = Buffer.from(value, 'utf8').toString('base64')
   localStorage.setItem(key,encryptedData)
}

export function getLocalDB(key){
   let value = localStorage.getItem(key)
   let decryptedData = Buffer.from(value, 'base64').toString('utf8')
   return decryptedData
}


export function clear(){
   localStorage.clear()
}