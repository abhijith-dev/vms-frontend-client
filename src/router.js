import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Splash from './components/splash/Splash';
import Reset from './components/resetpassword/Reset';
import {useEffect,useState} from 'react';
import { getLocalDB } from './functions/localstore';
import Home from './components/dashboard/Home';
import Selection from './components/dashboard/Selection';
import Payment from './components/dashboard/Payment'

function TemplateRouter() {
  const [redirect,setRedirect] = useState(false)
  const [onRaid,setOnRaid] = useState(false)
  useEffect(()=>{
    let secret =  getLocalDB('_usau')
    if(secret=== null){
       setRedirect(false)
    }
    else{
      setRedirect(true)
    }
    let raid = getLocalDB('__InBook')
    if(raid === 'y'){
      setOnRaid(true)
    }
  },[])
  return (
    <>
     <BrowserRouter>
       <Routes>   
         <Route path='/' element={(redirect && onRaid)?<Payment/>:((redirect ? <Home />:<Splash />))}/> 
         <Route path='/login' element={<Login />}/>
         <Route path='/signup' element={<Signup />}/>
         <Route path='/reset-password' element={<Reset />}/>
         <Route path='/selection' element={<Selection />}/>
         <Route path='/booking' element={<Payment />}/>
       </Routes>
     </BrowserRouter>
    </>
  );
}

export default TemplateRouter;
