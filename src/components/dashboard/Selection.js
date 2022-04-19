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
      console.log(id)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    React.useEffect(()=>{
     let values = JSON.parse(getSessionDB('_bookings'))
     console.log(values)
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
                          <Typography gutterBottom variant="h5" component="div">
                                 {`${result.company} ${result.name} - ${result.model}`}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                                 {`${(result.v_amount).toFixed(8)} ETH`}
                          </Typography>
                          <Stack direction={"row"} spacing={2} >
                          <Button onClick={()=>{handleClickOpen(result._id)}}  style={{backgroundColor:"#222"}} variant="contained" >
                            Info
                          </Button>
                          <Button  style={{backgroundColor:"#222"}} variant="contained" >
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
            <ListItemText primary={`Vehilce Registration Number :${info[0].r_no}`} secondary="vehicle registration number" />
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemText primary={`Total Number of Passangers :${info[0].p_range}`} secondary="maximum number of passanger can travel in this vehicle at a time" />
          </ListItem>
          <Divider />
          <ListItem >
          <ListItemText primary={`Total Number of Goods can Carry :${info[0].g_range} Kg`} secondary="maximum number of goods can crry in this vehicle at a time except allocated normal luggage space." />
          </ListItem>
          <Divider />
          <Typography variant="h6" component="div" >Driver Details</Typography>
          <img src={info[0].drivers.picture} alt={"driver"} width={100} height={100} style={{borderRadius:"100%"}}/>
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