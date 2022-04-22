import { Grid } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'

export default function Splash() {
  return (
    <div>
        <Navbar />
        <Grid container direction={"row"}
               item
               xs={false}
               sm={4}
               md={7}
                sx={{
                    backgroundImage: 'url(https://scwcontent.affino.com/AcuCustom/Sitename/DAM/023/various_mobility_services_Adobe.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
         spacing={2}>
          <Grid xs={6}></Grid>
        </Grid>
    </div>
  )
}
