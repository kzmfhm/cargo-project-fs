import React, { useEffect } from 'react'
import UserViewLeft from 'src/views/profile/UserViewLeft'
import UserViewRight from 'src/views/profile/UserViewRight'
import { Grid, Container } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { useAppDispatch } from 'src/hooks/useRedux'
import { me } from 'src/redux/slices/accounts'

const Profile = () => {
  const dispatch = useAppDispatch()

  const auth = useAuth()
  // Refill the redux store with the user data
  useEffect(() => {
    dispatch(me((auth?.user?.token as string) || ''))
  }, [auth.user])

  return (
    <Container maxWidth="xl">
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight tab={'partners'} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile
