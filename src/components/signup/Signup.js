import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {userSignUp} from '../../functions/auth';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'
import { setLocalDB } from '../../functions/localstore';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link   style={{textDecoration:'none',color:'#0009'}} to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette:{
        dark:'#222'
    }  
});

export default function Signup() {
  const [error,setError] = React.useState(false)
  const [errormessage,setErrorMessage] = React.useState('')
  const [btnstatus,setBtnstatus] = React.useState(true)
  const [cper,setCper] = React.useState(null)
  const [accept,setAccept] = React.useState(false)
  const [pass,setPass] = React.useState('')
  const [loading,setLoading] = React.useState(false)

  React.useEffect(()=>{
    if(accept && cper === false){
        setBtnstatus(false)
    }
  },[accept,cper])
  const handleSubmit = async(event) => {
    setError(false)
    setErrorMessage('')  
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
      let body = {
            name: data.get('name'),
            email:data.get('email'),
            password: data.get('password'),
            city:data.get('city'),
            phone:data.get('phno')
    }; 
    let response = await userSignUp(body)  
    if(response.error){
        setLoading(false)
        setError(true);
        setErrorMessage(response.message)
    }
    else{
      setLoading(false)
      setLocalDB("_usau",JSON.stringify(response))
    }
  };
 const passwordValidator = (event)=>{
    if(pass === event.target.value){
        setCper(false)
    }
    else{
        setCper(true)
    }
 }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      {
          loading?(
            <>
              <Backdrop
               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
             < CircularProgress color="inherit" />
             </Backdrop>
            </>
          ):null
        }
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1}} style={{backgroundColor:'#222'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} validate={true} sx={{ mt: 1 }}>
          {
                error?
                (
                    <><Alert severity="error">{errormessage}</Alert></>
                ):null
          }
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="username"
              name="name"
              color='dark'
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              color="dark"
              type="email"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phno"
              label="phone number"
              color="dark"
              type="numeric"
              pattern="[0-9]{10}"
              id="phno"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="city"
              label="city"
              color="dark"
              type="text"
              id="city"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              color="dark"
              type="password"
              id="password1"
              onChange={(e)=>{setPass(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cpassword"
              label="confirm password"
              color="dark"
              onKeyUp={passwordValidator}
              type="password"
              id="password2"
            />
            {
                cper?(
                    <><Alert severity="error">{'password is not matching'}</Alert></>
                ):null
            }
            <FormControlLabel
              control={<Checkbox onChange={e=>{e.target.checked?setAccept(true):setAccept(false)}} value="remember" style={{color:"#222"}} />}
              label="I agree to the Terms and Conditions"
            />
            
            <Button
              disabled={btnstatus}
              type="submit"
              fullWidth
              variant="contained"
              style={btnstatus?{backgroundColor:'#0003',color:'#fff'}:{backgroundColor:'#222',color:'#fff'}}
              sx={{ mt: 3, mb: 2 }}
            >
              CREATE ACCOUNT
            </Button>
            <Grid container>
              <Grid item>
                <Link  to="/login"  style={{color:'#0009',fontSize:'0.9rem'}} >
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}