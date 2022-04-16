import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Splash from './components/splash/Splash';
import Reset from './components/resetpassword/Reset';
import {useEffect,useState} from 'react';
import { getLocalDB } from './functions/localstore';
import Home from './components/dashboard/Home';

function TemplateRouter() {
  const [redirect,setRedirect] = useState(true)
  useEffect(()=>{
    let secret =  getLocalDB('_usau')
    if(secret=== null){
       setRedirect(true)
    }
    else{
      setRedirect(true)
    }
  },[])
  return (
    <>
     <BrowserRouter>
       <Routes>  
        <Route path='/' element={redirect?<Home />:<Splash />}/> 
         <Route path='/login' element={<Login />}/>
         <Route path='/signup' element={<Signup />}/>
         <Route path='/reset-password' element={<Reset />}/>
       </Routes>
     </BrowserRouter>
    </>
  );
}

export default TemplateRouter;
