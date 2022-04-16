import axios from 'axios';
import { fetchWallet } from './wallet';
import {ENV}from '../configs/configs';
import {APIS} from '../configs/configAPIs';

let headers = {
    'content-type':'application/json',
    'browser-id':'116.12.250.1'
}
export  async function userSignUp(body) {
   let response ={} 
   let url = `${ENV.API_BASE_URL}${APIS.USERS.CREATE.url}`
   let method = `${APIS.USERS.CREATE.method}`
    let wallet = await fetchWallet()
    if(wallet.error){
        response.error=true
        response.message='wallet not found in your browser'
        return response
    }
    headers.wallet_address = wallet.account
    headers.wallet_amount = wallet.balance
   let res = await axios({
        url,
        method,
        headers,
        data:body
    })
    if(res.status === 201){
      response.access_token = res.data.access_token
      response.timestamp = res.data.timestamp
      response.expiredAt =res.data.expiredAt
      response.error = false
      response.message = 'success'
    }
    else{
        response.error = true
        response.message = res.data.exception  
    }
    return response
}

export async function userLogin(body){
    let response ={} 
    let url = `${ENV.API_BASE_URL}${APIS.USERS.LOGIN.url}`
    let method = `${APIS.USERS.LOGIN.method}`
    let wallet = await fetchWallet()
     if(wallet.error){
         response.error=true
         response.message='wallet not found in your browser'
         return response
     }
     headers.wallet_address = wallet.account
     headers.wallet_amount = wallet.balance
    let res = await axios({
         url,
         method,
         headers,
         data:body
     })
     if(res.status === 200){
       response.access_token = res.data.access_token
       response.timestamp = res.data.timestamp
       response.expiredAt =res.data.expiredAt
       response.error = false
       response.message = 'success'
     }
     else{
         response.error = true
         response.message = res.data.exception  
     }
     return response
}

export async function getPin(body){
    let response ={}
    let url = `${ENV.API_BASE_URL}${APIS.USERS.GETPIN.url}`
    let method = `${APIS.USERS.GETPIN.method}`
    let res = await axios({
        url,
        method,
        headers,
        data:body
    })
    if(res.status === 200){
        response.error = false
        response.message = 'success'
    }
    else{
        response.error = true
        response.message = res.data.exception  
    }
    return response

}

export async function setPassword(body){
    let response ={}
    let url = `${ENV.API_BASE_URL}${APIS.USERS.SETPASSWORD.url}`
    let method = `${APIS.USERS.SETPASSWORD.method}`
    let res = await axios({
        url,
        method,
        headers,
        data:body
    })
    if(res.status === 200){
        response.error = false
        response.message = 'success'
    }
    else{
        response.error = true
        response.message = res.data.exception  
    }
    return response

}