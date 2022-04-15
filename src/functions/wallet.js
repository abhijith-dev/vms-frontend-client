export async function  fetchWallet(){
    let account = null
    let balance = null
    if(window.ethereum){
        await window.ethereum.request({method:'eth_requestAccounts'})
        .then(async(result)=>{
            account = result[0]
            await window.ethereum.request({method:'eth_getBalance',params:[account,'latest']})
            .then(bal=>{
                balance = bal
            })
        })
        return {account,balance,error:false}
    }
    else{
        return {
            error:true
        }
    }
}