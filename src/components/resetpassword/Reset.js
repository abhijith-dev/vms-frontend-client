import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import {getPin,setPassword} from '../../functions/auth';
import Alert from '@mui/material/Alert';
import { getLocalDB, setLocalDB } from '../../functions/localstore';

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

export default function Reset() {
  const [error,setError] = React.useState(false)
  const [errormessage,setErrorMessage] = React.useState('')
  const [toggle,setToggle] = React.useState(true)
  const handleSubmit1 =async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body ={
      email:data.get('email'),
    }
    let response = await getPin(body)
    if(response.error){
        setError(true);
        setErrorMessage(response.message)
    }
    else{
      setLocalDB('eml',data.get('email'))
      setToggle(false)
    }
  };

  const handleSubmit2 =async (event) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("")
    const data = new FormData(event.currentTarget);
    if(data.get("password1") === data.get("password2")){
      let body ={
        email:getLocalDB('eml'),
        password:data.get('password1')
      }
      let response = await setPassword(body)
      if(response.error){
          setError(true);
          setErrorMessage(response.message)
      }
    }
    else{
      setError(true);
      setErrorMessage("password does not match")
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      {
          toggle?(
              <>
               <Container component="main" maxWidth="xs">
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
           reset your password
          </Typography>
          <Box component="form" onSubmit={handleSubmit1} validate={true} sx={{ mt: 1 }}>
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
              id="email"
              label="Email Address"
              name="email"
              color='dark'
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:'#222'}}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
              </>
          ):(
              <>
    <Container component="main" maxWidth="xs">
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
            Reset your password
          </Typography>
          <Box component="form" onSubmit={handleSubmit2} validate={true} sx={{ mt: 1 }}>
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
              id="pin"
              label="PIN"
              name="pin"
              color='dark'
              type="number"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password1"
              label="new password"
              name="password1"
              type="password"
              color='dark'
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password2"
              type="password"
              label="confirm password"
              name="password2"
              color='dark'
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:'#222'}}
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
              </>
          )
      }
    </ThemeProvider>
  );
}