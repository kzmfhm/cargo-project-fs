// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useAuth } from 'src/hooks/useAuth'

import TableBookings from 'src/views/bookings/list/TableBookings'
import { useAppDispatch } from 'src/hooks/useRedux'
import { getBookings } from 'src/redux/slices/bookings'
import { useMemo } from 'react'

const Bookings = () => {
  const auth = useAuth()
  let token: string = auth.user?.token as string

  const dispatch = useAppDispatch()

  useMemo(() => {
    dispatch(getBookings(token))
  }, [dispatch, token])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableBookings />
      </Grid>
    </Grid>
  )
}

export default Bookings
