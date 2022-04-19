import axios from 'axios';
import {ENV}from '../configs/configs';
import {APIS} from '../configs/configAPIs';
import {getLocalDB} from './localstore';
import { fetchWallet } from './wallet';

let headers = {
    'content-type':'application/json',
    'browser-id':'116.12.250.1'
}

export async function initiateBooking(body){
    let response ={}
    let url = `${ENV.API_BASE_URL}${APIS.BOOKING.INITIATE.url}`
    let method = `${APIS.BOOKING.INITIATE.method}`
    let token = JSON.parse(getLocalDB('_usau'))
    headers["access-token"] = `Bearer ${token.access_token}`
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
        if(res.status === 200){
            response.error = false
            response.result = res.data
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.exception 
    })
    return response
}