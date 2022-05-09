import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {getLocalDB, setLocalDB} from '../../functions/localstore';
import {getVehicleDetails} from '../../functions/auth'
import { Button, CssBaseline, Stack } from '@mui/material';
import {Buffer} from 'buffer';
import { fetchWallet } from '../../functions/wallet';

export default function Payment() {
  const [products,setProduct] = React.useState([])
  const [product_id,setProductId] = React.useState('')
  const [account,setAccount] = React.useState('')
  const [cancelBtn,setCancelBtn] = React.useState(false)
  React.useEffect(()=>{
      let date = new Date()
      let current_time = date.getTime()
      let disable_obj = new Date(current_time + 1*60000)
      let disabledCancel = disable_obj.getTime()
      let existedDisabledCancel = getLocalDB('__edc')
      if(existedDisabledCancel === null || existedDisabledCancel === undefined)
      setLocalDB('__edc',disabledCancel.toString())
      let values = JSON.parse(getLocalDB('__binfo'))
      let id = getLocalDB('__bId')
      async function fetch(){
        let vehicles =await getVehicleDetails(values.vehicle_id)
        setProduct([{...values,...vehicles.data}])
        setProductId(JSON.parse(id)._id)
        let wallet = await fetchWallet()
        setAccount(wallet.account)
      }
     fetch()
  },[])
  
  let timer = setInterval(()=>{
    let store_time = parseInt(getLocalDB('__edc'))
    let date = new Date()
    if(date.getTime() >= store_time){
      setCancelBtn(true)
      clearInterval(timer)
    }
  },1000)
  const makePayment = ()=>{
    let part = {
      status:'complete',
      id:product_id,
      vehicle:products[0].vehicle_id,
      amount:products[0].amount
    }
    let secret = Buffer.from(JSON.stringify(part), 'utf8').toString('base64')
    window.open(`http://localhost:3002?key=${secret}`,"_blank","fullscreen=0,height=600px")
  }

  const cancelPayment = ()=>{
    let part = {
      status:'partial',
      id:product_id,
      vehicle:products[0].vehicle_id,
      amount:products[0].amount
    }
    let secret = Buffer.from(JSON.stringify(part), 'utf8').toString('base64')
    window.open(`http://localhost:3002?key=${secret}`,"_blank","fullscreen=0,height=600px")
  }
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper elevation={9} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography  style={{color:"green"}} variant="h6" gutterBottom>
        Your Booking Confirmed..
      </Typography>
      <CssBaseline />
      <List disablePadding>
        {products.map((product) => (
          <>
           <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={ `${product.from} - ${product.to}`} secondary={`${product.name} ${product.model} - ${product.r_no}`} />
            <Typography variant="body2">vehicle cost: {product.v_cost} ETH</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {product.amount} ETH
          </Typography>
        </ListItem>
          </>
        ))}
      </List>
      {
        products.map((product)=>(
          <>
           <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" style={{color:"orange"}} gutterBottom sx={{ mt: 2 }}>
            Driver Details
          </Typography>
          <Typography gutterBottom><b>Name :</b>  {product.drivers.name}</Typography>
          <Typography gutterBottom><b>Phone :</b> {product.drivers.phone}</Typography>
          <Typography gutterBottom><b>Age :</b> {product.drivers.age}</Typography>
          <Typography gutterBottom><b>License No. :</b> {product.drivers.license}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" style={{color:"orange"}} gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment key={product.product_id}>
                <Grid item xs={6}>
                  <Typography style={{fontSize:"0.7rem",color:"grey"}} gutterBottom><b style={{fontSize:"1rem",color:"#222"}}>Address</b> {`${account}`}</Typography>
                  <Typography gutterBottom><b>Basic Cost</b> {product.v_cost} ETH</Typography>
                  <Typography gutterBottom><b>Extra Cost</b> {`${(product.amount)-(product.v_cost)}`} ETH</Typography>
                  <Typography gutterBottom><b>Total Cost</b> {product.amount} ETH</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
          </>
        ))
      }
      <Stack mt={5} direction={"row"} spacing={5}>
        <Button
         fullWidth={true}
         disabled={cancelBtn}
         onClick={cancelPayment}
         style={cancelBtn?{backgroundColor:"#0004",color:"#fff"}:{backgroundColor:"#222",color:"#fff"}}
        >
          Cancel
        </Button>
        <Button
         fullWidth={true}
         onClick={makePayment}
         style={{backgroundColor:"#222",color:"#fff"}}
        >
          Pay now
        </Button>
      </Stack>
      </Paper>
    </Container>
  );
}