import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Splash from './components/splash/Splash';
import Reset from './components/resetpassword/Reset';

function TemplateRouter() {
  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<Splash/>}/>
         <Route path='/login' element={<Login />}/>
         <Route path='/signup' element={<Signup />}/>
         <Route path='/reset-password' element={<Reset />}/>
       </Routes>
     </BrowserRouter>
    </>
  );
}

export default TemplateRouter;
