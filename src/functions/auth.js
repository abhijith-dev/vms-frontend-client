import axios from 'axios';
import { fetchWallet } from './wallet';
import {ENV}from '../configs/configs';
import {APIS} from '../configs/configAPIs';
import {getLocalDB} from './localstore'
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
    headers["wallet-address"] = wallet.account
    headers["wallet-amount"] = wallet.balance
    await axios({
        url,
        method,
        headers,
        data:body
    })
    .then(res=>{
        if(res.status === 201){
            response.access_token = res.data.access_token
            response.timestamp = res.data.timestamp
            response.expiredAt =res.data.expiredAt
            response.error = false
            response.message = 'success'
          }
     })
     .catch(error=>{
        response.error = true
        response.message = error.response.data.exception
     })
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
     headers["wallet-address"] = wallet.account
     headers["wallet-amount"] = wallet.balance
    await axios({
         url,
         method,
         headers,
         data:body
     })
     .then(res=>{
        if(res.status === 202){
            response.access_token = res.data.access_token
            response.timestamp = res.data.timestamp
            response.expiredAt =res.data.expiredAt
            response.error = false
            response.message = 'success'
          }
     })
     .catch(error=>{
        response.error = true
        response.message = error.response.data.exception
     })
     
     return response
}

export async function getPin(body){
    let response ={}
    let url = `${ENV.API_BASE_URL}${APIS.USERS.GETPIN.url}`
    let method = `${APIS.USERS.GETPIN.method}`
    await axios({
        url,
        method,
        headers,
        data:body
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
            response.message = 'success'
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.exception  
    })
 
    return response
}

export async function setPassword(body){
    let response ={}
    let url = `${ENV.API_BASE_URL}${APIS.USERS.SETPASSWORD.url}`
    let method = `${APIS.USERS.SETPASSWORD.method}`
    await axios({
        url,
        method,
        headers,
        data:body
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
            response.message = 'success'
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.exception  
    })
    return response

}

export async function getUser(){
    let response ={}
    let url = `${ENV.API_BASE_URL}${APIS.USERS.GETUSER.url}`
    let method = `${APIS.USERS.GETUSER.method}`
    let token = JSON.parse(getLocalDB('_usau'))
    headers["access-token"] = `Bearer ${token.access_token}`
    await axios({
        url,
        method,
        headers
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
            response.user = res.data
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.exception  
    })
 
    return response
}

export async function getVehicleDetails(id){
    let response ={}
    let url = `${ENV.API_BASE_URL}${APIS.PAYMENT.GET_VEHICLE.url}/${id}`
    let method = `${APIS.PAYMENT.GET_VEHICLE.method}`
    let token = JSON.parse(getLocalDB('_usau'))
    headers["access-token"] = `Bearer ${token.access_token}`
    await axios({
        url,
        method,
        headers
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
            response.data = res.data
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.exception  
    })
 
    return response
}

