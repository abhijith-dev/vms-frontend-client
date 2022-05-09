import React from 'react';
import Navbar from './Navbar';
import {getSessionDB} from '../../functions/sessionstore'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button,Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Eth from '../../assets/images/eth.png';
import Loc from '../../assets/images/location.png'
import { selectBooking } from '../../functions/booking';
import { setLocalDB } from '../../functions/localstore';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Selection = () => {
    const [data,setData] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [info,setInfo] = React.useState([])
    const handleClickOpen = (id) => {
      let value = data.filter(ele=>ele._id === id) 
      setInfo(value) 
      setOpen(true);
    };
   const __Booking = async(id)=>{
    let value = data.filter(ele=>ele._id === id) 
    let body ={
      from:value[0].from,
      to:value[0].to,
      amount:value[0].v_amount,
      passanger:(value[0].type_p_count)? true: false,
      goods:(value[0].type_g_count)?true:false,
      driver_id:value[0].drivers._id,
      vehicle_id:value[0]._id,
      postpayment:'ethereum'
    }
    let response = await selectBooking(body)
    if(response.error){
      alert("error")
    }
    else{
      setLocalDB('__InBook','y')
      setLocalDB('__binfo',JSON.stringify(body))
      setLocalDB('__bId',JSON.stringify(response.data))
      window.location.href="/booking"
    }
   }
    const handleClose = () => {
      setOpen(false);
    };
    React.useEffect(()=>{
     let values = JSON.parse(getSessionDB('_bookings'))
     setData(values.result)
    },[])
    return (
        <>
         <Navbar />
         {
            data.length?(
                <>
                 <Grid container >
                 <CssBaseline />
                {
                    data.map(result=>(
                        <Grid m={5} key={result._id} item xs={3}>
                         <Card sx={{ maxWidth: 345 }}>
                           <CardMedia
                             component="img"
                             height="140"
                             image={result.v_image}
                            alt="green iguana"
                        />
                          <CardContent>
                          <Typography style={{fontSize:"1.2rem",color:"green"}} gutterBottom variant="h6" component="div">
                                 {`${result.company} ${result.name} - ${result.model}`}
                          </Typography>
                          <Stack direction={"row"} spacing={0}>
                          <Typography gutterBottom variant="p" component="div">
                           <img src={Eth} alt={"eth"}  width={25} height={25} />
                          </Typography>
                          <Typography style={{marginTop:"2px"}} gutterBottom variant="p" component="div" >
                          {`${(result.v_amount).toFixed(8)} ETH`}
                          </Typography>
                          </Stack>
                          <Stack direction={"row"} spacing={0}>
                          <Typography gutterBottom variant="p" component="div">
                           <img src={Loc} alt={"location"}  width={20} height={20} />
                          </Typography>
                          <Typography style={{marginTop:"-2px",color:"orange"}} gutterBottom variant="p" component="div" >
                          {result.drivers.location}
                          </Typography>
                          </Stack>
                          <Stack mt={2} ml={2} direction={"row"} spacing={5} >
                          <Button onClick={()=>{handleClickOpen(result._id)}}  style={{backgroundColor:"#222"}} variant="contained" >
                            Info
                          </Button>
                          <Button onClick={()=>{__Booking(result._id)}}  style={{backgroundColor:"#222"}} variant="contained" >
                            BOOK NOW
                          </Button>
                          </Stack>    
                          </CardContent>
                        </Card> 
                       </Grid> 
                    ))
                }
                </Grid>
    {            
    info.length?(<>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{backgroundColor:"#222"}} sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
             {`${info[0].company} ${info[0].name} - ${info[0].model}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
        <ListItem >
            <ListItemText primary={`Vehilce Registration Number: ${info[0].r_no}`} secondary="vehicle registration number" />
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemText primary={`Total Number of Passangers: ${info[0].p_range}`} secondary="maximum number of passanger can travel in this vehicle at a time" />
          </ListItem>
          <Divider />
          <ListItem >
          <ListItemText primary={`Total Number of Goods can Carry: ${info[0].g_range} Kg`} secondary="maximum number of goods can carry in this vehicle at a time except allocated normal luggage space." />
          </ListItem>
          <Divider />
          <Typography ml={5} mt={5} variant="h6" component="div" ><b>Driver Details</b></Typography>
          <Grid mt={5} ml={5} container xs={10} direction={"row"}>
          <Grid xs={2}>
          <img src={info[0].drivers.picture} alt={"driver"} width={100} height={100} style={{borderRadius:"100%"}}/>
          </Grid>
          <Grid  xs={4}>
          <Typography variant="p" component="div" ><b>Driver Name</b>: {info[0].drivers.name}</Typography>
          <Typography variant="p" component="div" ><b>Driver Age</b>: {info[0].drivers.age}</Typography>
          <Typography variant="p" component="div" ><b>Driver Experience</b>: {info[0].drivers.experience}</Typography>
          <Typography variant="p" component="div" ><b>Driver Location</b>: {info[0].drivers.location}</Typography>
          <Typography variant="p" component="div" ><b>Driver PhoneNumber</b>: {info[0].drivers.phone}</Typography>
          </Grid>
          </Grid>
        </List>
      </Dialog>
    </>):null
     }
    </>
            ):(<>opps no vehicle found</>)
         }
        </>
    )
}

export default Selection;