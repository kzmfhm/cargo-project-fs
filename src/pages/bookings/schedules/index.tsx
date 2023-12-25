import { useEffect } from 'react'
import SpotBooking from 'src/views/bookings/schedules'
import { setFilteredSchedules, refillScedules } from 'src/redux/slices/schedules'
import { useAppDispatch } from 'src/hooks/useRedux'

const SpotBookingPage = () => {
  const dispatch = useAppDispatch()

  // Reset Schedules State on mount
  useEffect(() => {
    dispatch(setFilteredSchedules([]))
    dispatch(refillScedules([]))
  }, [])

  return <SpotBooking />
}

export default SpotBookingPage
