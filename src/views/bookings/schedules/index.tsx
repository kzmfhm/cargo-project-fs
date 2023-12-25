// ** MUI Imports
import { useMemo } from 'react'
import Grid from '@mui/material/Grid'

import SearchForm from './SearchForm'
import SearchResultsFilters from './SearchResultsFilters'
import SearchResults from './SearchResults'

import { getRoutes } from 'src/redux/slices/schedules'
import { useAuth } from 'src/hooks/useAuth'
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'

const SpotBooking = () => {
  const dispatch = useAppDispatch()
  const auth = useAuth()
  let token: string = auth.user?.token as string

  const { schedules, routes } = useAppSelector((state) => state.schedules)

  // Get Routes
  useMemo(() => {
    if (routes.length === 0) {
      dispatch(getRoutes(token))
    }
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SearchForm popperPlacement="bottom-start" />
      </Grid>

      {schedules && schedules.length > 0 ? (
        <>
          <Grid item xs={12} md={3} lg={3}>
            <SearchResultsFilters />
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <SearchResults />
          </Grid>
        </>
      ) : null}
    </Grid>
  )
}

export default SpotBooking
