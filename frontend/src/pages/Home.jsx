import React from 'react'
import AppLayOut from '../components/layouts/AppLayOut'
import { Box, Typography } from '@mui/material'
import { graycolor } from '../constants/color'

function Home() {
  return (
   <Box bgcolor={graycolor} height={"100vh"}>
<Typography p={"2rem"} variant="h5" textAlign={"center"}>
Select a friend to chat
</Typography>
</Box>
  )
}

export default AppLayOut()(Home)
