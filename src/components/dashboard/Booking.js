import React from 'react'
import Image from '../../assets/images/booking.jpeg';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {LocationCity,LocationOn,People,Luggage} from '@mui/icons-material';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';

const theme = createTheme({
    palette:{
        dark:'#222'
    }  
});
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link   style={{textDecoration:'none',color:'#0009'}} to="/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
export default function Booking() {
  const [goods,setGoods]=React.useState(false)  
  const [from,setFrom] = React.useState('')
  const [to,setTo] = React.useState('')
  const [people,setPeople] = React.useState('')
  const [luggage,setLuggage] = React.useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault();
  }
  return (
    <ThemeProvider theme={theme}>
    <Grid container direction={"row"} spacing={2}>
    <Grid ml={5} item mt={5} xs={5}>
    <Box component="form" onSubmit={handleSubmit} validate={true}>   
    <FormControl style={{width:"30rem"}} sx={{ m: 1 }}>
          <InputLabel color='dark' htmlFor="outlined-adornment-amount">From</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value= {from} 
            onChange={e=>setFrom(e.target.value)} 
            startAdornment={<InputAdornment position="start"><LocationCity /></InputAdornment>}
            label="From"
            color="dark"
            autoComplete='off'
            required
          />
    </FormControl>
    <FormControl style={{width:"30rem"}}  sx={{ m: 1 }}>
          <InputLabel color='dark' htmlFor="outlined-adornment-amount">To</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value= {to} 
            onChange={e=>setTo(e.target.value)}
            startAdornment={<InputAdornment position="start"><LocationOn /></InputAdornment>}
            label="To"
            color="dark"
            required
            autoComplete='off'
          />
    </FormControl>
    <FormControl style={{width:"30rem"}}  sx={{ m: 1 }}>
          <InputLabel color='dark' htmlFor="outlined-adornment-amount">Passenger</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value= {people} 
            onChange={e=>setPeople(e.target.value)}
            startAdornment={<InputAdornment position="start"><People /></InputAdornment>}
            label="Passenger"
            color="dark"
            required
            autoComplete='off'
          />     
    </FormControl>
    <FormGroup style={{marginTop:"0.5rem"}}>
      <FormControlLabel  control={<Switch onChange={e=>e.target.checked?setGoods(true):setGoods(false)} color='default' />} label="Do you have goods ?" />
    </FormGroup> 
    {
        goods?(
            <>
                <FormControl style={{width:"30rem"}}  sx={{ m: 1 }}>
          <InputLabel color='dark' htmlFor="outlined-adornment-amount">Goods</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value= {luggage} 
            onChange={e=>setLuggage(e.target.value)} 
            startAdornment={<InputAdornment position="start"><Luggage /></InputAdornment>}
            label="Goods"
            color="dark"
            autoComplete='off'
          />     
    </FormControl>
            </>
        ):null
    }
    <FormControl  style={{width:"30rem"}}  sx={{ m: 1 }}>
    <Button 
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:'#222'}}
              sx={{ mt: 3, mb: 2 }}
            >
              SEARCH
            </Button>   
    </FormControl> 
    </Box>        
    </Grid>    
    <Grid item xs={6}>
    <img src={Image} style={{marginTop:"0.6rem"}} alt ="booking" width={"700px"} height={"400px"}/>
    </Grid>
    </Grid>
    <Copyright sx={{ mt: 4 }} /> 
    </ThemeProvider>  
  )
}


