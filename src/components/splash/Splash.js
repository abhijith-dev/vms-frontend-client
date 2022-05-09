import { Grid } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'

export default function Splash() {
  return (
    <div>
        <Navbar />
        <Grid container direction={"row"}>
          <Grid></Grid>
        </Grid>
    </div>
  )
}
