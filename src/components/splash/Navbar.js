import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../../assets/css/splash.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import Logo from '../../assets/images/logo.jpeg'

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#222",height:"4rem"}} >
        <Toolbar variant="dense">
        <Stack direction="row" spacing={1}>
          <Avatar style={{marginTop:"10px"}} alt="Remy Sharp" src={Logo} />
          <Typography style={{marginTop:"15px"}} variant="h6" color="inherit" component="div">VMS</Typography>
        </Stack>
        <Stack style={{marginLeft:'60rem',marginTop:'10px '}} direction="row" spacing={2} >
        <Link to='/login' style={{textDecoration:'none'}} ><Button style={{backgroundColor:'#fff',color:'#222'}} variant="contained" size="small">LOGIN</Button></Link>
        <Link to='/signup' style={{textDecoration:'none'}}><Button style={{backgroundColor:'#fff',color:'#222'}} variant="contained" size="small">SIGNUP</Button></Link>
        </Stack>
        </Toolbar> 
      </AppBar>
    </Box>
  );
}

