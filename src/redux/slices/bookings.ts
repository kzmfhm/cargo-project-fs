import { createSlice } from '@reduxjs/toolkit'
import axios from 'src/utils/axios'
import { AppDispatch } from '../store'
import { Booking, BookingRateType, BookingPostRequestData } from 'src/db/types/bookings'

function calculateTotalPrice(ratetypes: BookingRateType[]): number {
  let totalPrice = 0.0

  ratetypes.forEach((rateType) => {
    if (rateType.UOM === 'PERBL') {
      // Check if equipment_type matches with the rateType.equipment_type
      if (rateType.equipment_type === rateType.equipment_type) {
        if (rateType.category === 'DISCOUNT') {
          totalPrice -= parseFloat(rateType.amount)
        } else {
          totalPrice += parseFloat(rateType.amount)
        }
      }
    } else if (rateType.UOM === 'PERCONT') {
      if (rateType.equipment_type === rateType.equipment_type) {
        totalPrice += parseFloat(rateType.amount) * rateType.quantity
      }
    }
  })

  return totalPrice
}

// Define a type for the slice state
interface BookingsState {
  isLoading: boolean
  error: string | null
  bookings: Booking[]
  bookingFormRateTypes: BookingRateType[]
  bookingFormData: BookingPostRequestData | null
  booking: Booking | null
  success: boolean
}

const initialState: BookingsState = {
  isLoading: false,
  error: null,
  bookings: [],
  bookingFormRateTypes: [],
  bookingFormData: null,
  booking: null,
  success: false,
}

const slice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    getBookingsStart(state) {
      state.isLoading = true
      state.error = null
      state.bookings = []
    },

    getBookingsSuccess(state, action) {
      const bookingsWithTotalPrice = action.payload.map((booking: Booking) => {
        const totalPrice = calculateTotalPrice(booking.rate_types)

        return { ...booking, total_price: totalPrice }
      })
      state.bookings = bookingsWithTotalPrice
      state.isLoading = false
    },

    getBookingsFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    createBookingStart(state) {
      state.isLoading = true
      state.error = null
      state.success = false
    },

    createBookingSuccess(state, action) {
      state.booking = action.payload
      state.isLoading = false
      state.success = true
    },

    createBookingFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    setBookingFormRateTypes(state, action) {
      state.bookingFormRateTypes = action.payload
    },

    setBookingFormData(state, action) {
      state.bookingFormData = action.payload
    },

    resetState(state) {
      state.isLoading = false
      state.error = null
      state.bookings = []
      state.bookingFormRateTypes = []
      state.bookingFormData = null
      state.booking = null
    },
  },
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions
export function getBookings(token: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getBookingsStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get('/api/v1/bookings', config)
      dispatch(actions.getBookingsSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getBookingsFailure(err.detail))
    }
  }
}

export function setBookingFormRateTypes(data: BookingRateType[]) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setBookingFormRateTypes(data))
  }
}

export function setBookingFormData(data: BookingPostRequestData) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setBookingFormData(data))
  }
}

export function createBooking(token: string, data: BookingPostRequestData) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.createBookingStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.post('/api/v1/bookings/create/', data, config)
      dispatch(actions.createBookingSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.createBookingFailure(err.detail))
    }
  }
}

export function resetBookingState() {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.resetState())
  }
}
