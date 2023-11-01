
import Carlist from './Components/Carlist'

import { AppBar, Typography } from '@mui/material'

function App() {
 return (
 <>
 <AppBar position="sticky">
 <Typography variant="h5">
 Car Shop
 </Typography>
 </AppBar>
 <Carlist />
 </>
 )
} 

export default App
