// ** MUI Imports
import Grid from '@mui/material/Grid'

import ConfirmationWizard from 'src/views/bookings/confirmation/index'

const Confirmation = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ConfirmationWizard />
      </Grid>
    </Grid>
  )
}

export default Confirmation
