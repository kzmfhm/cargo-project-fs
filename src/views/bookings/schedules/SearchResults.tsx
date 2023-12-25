import React from 'react'
import SearchedRouteCard from './SearchedRouteCard'
import { Grid } from '@mui/material'
import { useAppSelector } from 'src/hooks/useRedux'

const SearchResults = () => {
  const { schedules, filteredSchedules, dataIsBeingFiltered } = useAppSelector((state) => state.schedules)

  return (
    <Grid item xs={12}>
      {dataIsBeingFiltered ? (
        filteredSchedules.map((schedule) => (
          <React.Fragment key={schedule.id}>
            <SearchedRouteCard schedule={schedule} />
            <br />
          </React.Fragment>
        ))
      ) : (
        <>
          {filteredSchedules.length > 0
            ? filteredSchedules.map((schedule) => (
                <React.Fragment key={schedule.id}>
                  <SearchedRouteCard schedule={schedule} />
                  <br />
                </React.Fragment>
              ))
            : // If price filter is not active and filteredSchedules is empty, render all schedules
              schedules.map((schedule) => (
                <React.Fragment key={schedule.id}>
                  <SearchedRouteCard schedule={schedule} />
                  <br />
                </React.Fragment>
              ))}
        </>
      )}
    </Grid>
  )
}

export default SearchResults
