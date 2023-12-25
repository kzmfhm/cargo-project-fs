import { createSlice } from '@reduxjs/toolkit'
import axios from 'src/utils/axios'
import { AppDispatch } from '../store'
import { Schedule, Route, SearchFormData } from 'src/db/types/schedules'

interface Charges {
  totalPrice: number
  originCharges: number
  destinationCharges: number
  freightCharges: number
}

function calculateTotalPrice(schedule: Schedule, quantity: string, equipment_type: string): Charges {
  // Ensure quantity is at least 1
  const parsedQuantity = Math.max(parseFloat(quantity), 1)

  let originCharges = 0.0
  let destinationCharges = 0.0
  let freightCharges = 0.0

  let hasRateTypes = schedule.ratetypes.length > 0

  let serviceCode = schedule.service_code // check if rate.link

  let sealinesRates = schedule.sealine.rates
  let routeRates = schedule.route.rates

  if (hasRateTypes) {
    // Do calculations with rate types
    // Check if link is for service_code
    // 1. Check equipment_type
    for (let i = 0; i < schedule.ratetypes.length; i++) {
      let rateType = schedule.ratetypes[i]
      if (rateType.equipment_type === equipment_type) {
        // Check UOM
        if (rateType.UOM === 'PERBL') {
          // Check category
          if (rateType.category === 'ORIGIN') {
            originCharges += parseFloat(rateType.amount)
          } else if (rateType.category === 'DESTINATION') {
            destinationCharges += parseFloat(rateType.amount)
          } else if (rateType.category === 'FREIGHT') {
            freightCharges += parseFloat(rateType.amount)
          }
        } else if (rateType.UOM === 'PERCONT') {
          if (rateType.category === 'ORIGIN') {
            originCharges += parseFloat(rateType.amount) * parsedQuantity
          } else if (rateType.category === 'DESTINATION') {
            destinationCharges += parseFloat(rateType.amount) * parsedQuantity
          } else if (rateType.category === 'FREIGHT') {
            freightCharges += parseFloat(rateType.amount) * parsedQuantity
          }
        }
      }
    }
  } else {
    // Sealines only rates

    if (sealinesRates.length > 0) {
      for (let i = 0; i < sealinesRates.length; i++) {
        let rate = sealinesRates[i]

        // Check if rate.start_date is more than start_date and rate.end_date is less than end_date then use this rate
        if (rate.start_date && rate.end_date) {
          let rate_start_date = new Date(rate.start_date)
          let rate_end_date = new Date(rate.end_date)

          let schedule_etd = new Date(schedule.origin_departure_date_estimated)

          if (rate_start_date <= schedule_etd && rate_end_date >= schedule_etd) {
            // Rate is valid for this schedule and Sealine
            if (rate.link === serviceCode) {
              for (let j = 0; j < rate.ratetypes.length; j++) {
                let rateType = rate.ratetypes[j]
                if (rateType.equipment_type === equipment_type) {
                  // Check link
                  if (rate.link && rate.link === serviceCode) {
                    // 2. Check UOM
                    if (rateType.UOM === 'PERBL') {
                      // 3. Check category
                      if (rateType.category === 'ORIGIN') {
                        originCharges += parseFloat(rateType.amount)
                      } else if (rateType.category === 'DESTINATION') {
                        destinationCharges += parseFloat(rateType.amount)
                      } else if (rateType.category === 'FREIGHT') {
                        freightCharges += parseFloat(rateType.amount)
                      }
                    } else if (rateType.UOM === 'PERCONT') {
                      if (rateType.category === 'ORIGIN') {
                        originCharges += parseFloat(rateType.amount) * parsedQuantity
                      } else if (rateType.category === 'DESTINATION') {
                        destinationCharges += parseFloat(rateType.amount) * parsedQuantity
                      } else if (rateType.category === 'FREIGHT') {
                        freightCharges += parseFloat(rateType.amount) * parsedQuantity
                      }
                    }
                  } else {
                    // 2. Check UOM
                    if (rateType.UOM === 'PERBL') {
                      // 3. Check category
                      if (rateType.category === 'ORIGIN') {
                        originCharges += parseFloat(rateType.amount)
                      } else if (rateType.category === 'DESTINATION') {
                        destinationCharges += parseFloat(rateType.amount)
                      } else if (rateType.category === 'FREIGHT') {
                        freightCharges += parseFloat(rateType.amount)
                      }
                    } else if (rateType.UOM === 'PERCONT') {
                      if (rateType.category === 'ORIGIN') {
                        originCharges += parseFloat(rateType.amount) * parsedQuantity
                      } else if (rateType.category === 'DESTINATION') {
                        destinationCharges += parseFloat(rateType.amount) * parsedQuantity
                      } else if (rateType.category === 'FREIGHT') {
                        freightCharges += parseFloat(rateType.amount) * parsedQuantity
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      // Routes only rates
      if (routeRates.length > 0) {
        for (let i = 0; i < routeRates.length; i++) {
          let rate = routeRates[i]

          if (rate.start_date && rate.end_date) {
            let rate_start_date = new Date(rate.start_date)
            let rate_end_date = new Date(rate.end_date)
            let schedule_etd = new Date(schedule.origin_departure_date_estimated)
            if (rate_start_date <= schedule_etd && rate_end_date >= schedule_etd) {
              // Rates are valid for this schedule and Route
              for (let j = 0; j < rate.ratetypes.length; j++) {
                let rateType = rate.ratetypes[j]
                if (rateType.equipment_type === equipment_type) {
                  if (rate.link && rate.link === serviceCode) {
                    // 2. Check UOM
                    if (rateType.UOM === 'PERBL') {
                      // 3. Check category
                      if (rateType.category === 'ORIGIN') {
                        originCharges += parseFloat(rateType.amount)
                      } else if (rateType.category === 'DESTINATION') {
                        destinationCharges += parseFloat(rateType.amount)
                      } else if (rateType.category === 'FREIGHT') {
                        freightCharges += parseFloat(rateType.amount)
                      }
                    } else if (rateType.UOM === 'PERCONT') {
                      if (rateType.category === 'ORIGIN') {
                        originCharges += parseFloat(rateType.amount) * parsedQuantity
                      } else if (rateType.category === 'DESTINATION') {
                        destinationCharges += parseFloat(rateType.amount) * parsedQuantity
                      } else if (rateType.category === 'FREIGHT') {
                        freightCharges += parseFloat(rateType.amount) * parsedQuantity
                      }
                    }
                  }
                } else {
                  // 2. Check UOM
                  if (rateType.UOM === 'PERBL') {
                    // 3. Check category
                    if (rateType.category === 'ORIGIN') {
                      originCharges += parseFloat(rateType.amount)
                    } else if (rateType.category === 'DESTINATION') {
                      destinationCharges += parseFloat(rateType.amount)
                    } else if (rateType.category === 'FREIGHT') {
                      freightCharges += parseFloat(rateType.amount)
                    }
                  } else if (rateType.UOM === 'PERCONT') {
                    if (rateType.category === 'ORIGIN') {
                      originCharges += parseFloat(rateType.amount) * parsedQuantity
                    } else if (rateType.category === 'DESTINATION') {
                      destinationCharges += parseFloat(rateType.amount) * parsedQuantity
                    } else if (rateType.category === 'FREIGHT') {
                      freightCharges += parseFloat(rateType.amount) * parsedQuantity
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    totalPrice: originCharges + destinationCharges + freightCharges,
    originCharges: originCharges,
    destinationCharges: destinationCharges,
    freightCharges: freightCharges,
  } as Charges
}

// Define a type for the slice state
interface ScheduleState {
  isLoading: boolean
  isSchedulesLoading: boolean
  error: string | null
  schedules: Schedule[]
  routes: Route[]
  searchFormData: SearchFormData | null
  selectedSchedule: Schedule | null
  filteredSchedules: Schedule[]

  isPriceFilterActive: boolean
  originCharges: boolean
  destinationCharges: boolean
  freightCharges: boolean
  priceSortOrder: boolean
  availibitySortOrder: boolean

  dataIsBeingFiltered: boolean
}

function updatePrice(state: ScheduleState) {
  let schedules = state.filteredSchedules.length > 0 ? state.filteredSchedules : state.schedules

  for (let i = 0; i < schedules.length; i++) {
    let schedule = state.schedules[i]
    let price = 0
    if (state.originCharges) {
      price += schedule?.origin_charges || 0
    }
    if (state.destinationCharges) {
      price += schedule?.destination_charges || 0
    }
    if (state.freightCharges) {
      price += schedule?.freight_charges || 0
    }
    schedule.total_price = price
  }
}

const initialState: ScheduleState = {
  isLoading: false,
  isSchedulesLoading: false,
  error: null,
  schedules: [],
  routes: [],
  searchFormData: null,
  selectedSchedule: null,

  filteredSchedules: [],
  isPriceFilterActive: false,

  originCharges: true,
  destinationCharges: true,
  freightCharges: true,

  priceSortOrder: true,
  availibitySortOrder: false,

  dataIsBeingFiltered: false,
}

const slice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    getSchedulesStart(state) {
      state.isSchedulesLoading = true
      state.error = null
      state.schedules = []
      state.filteredSchedules = []
    },

    getSchedulesSuccess(state, action) {
      const schedulesWithTotalPrice = action.payload.map((schedule: Schedule) => {
        const quantity = state.searchFormData ? state.searchFormData?.quantity : '1'
        const equipmentType = state.searchFormData ? state.searchFormData?.equipment_type : '20'
        const charges = calculateTotalPrice(schedule, quantity, equipmentType)
        const totalPrice = charges.totalPrice
        const originCharges = charges.originCharges
        const destinationCharges = charges.destinationCharges
        const freightCharges = charges.freightCharges

        return {
          ...schedule,
          total_price: totalPrice,
          origin_charges: originCharges,
          destination_charges: destinationCharges,
          freight_charges: freightCharges,
        }
      })

      const filteredSchedules = schedulesWithTotalPrice.filter((schedule: Schedule) => schedule.total_price !== 0)

      // Sort from low to high by default
      let sortedSchedules = filteredSchedules.sort((a: Schedule, b: Schedule) => {
        return a.total_price! - b.total_price!
      })

      state.schedules = sortedSchedules
      state.isSchedulesLoading = false
    },

    sortSchedulesAccordingToPrice(state) {
      if (state.priceSortOrder) {
        // Sort from low to high
        let sch = state.filteredSchedules.length > 0 ? state.filteredSchedules : state.schedules
        let sortedSchedules = sch.sort((a: Schedule, b: Schedule) => {
          return a.total_price! - b.total_price!
        })
        state.filteredSchedules = sortedSchedules
      } else {
        // Sort from High To Low
        let sch = state.filteredSchedules.length > 0 ? state.filteredSchedules : state.schedules
        let sortedSchedules = sch.sort((a: Schedule, b: Schedule) => {
          return b.total_price! - a.total_price!
        })
        state.filteredSchedules = sortedSchedules
      }
    },

    getSchedulesFailure(state, action) {
      state.isSchedulesLoading = false
      state.error = action.payload
    },

    getRoutesStart(state) {
      state.isLoading = true
      state.error = null
      state.routes = []
    },
    getRoutesSuccess(state, action) {
      state.routes = action.payload
      state.isLoading = false
    },

    getRoutesFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    setSearchFormData(state, action) {
      state.searchFormData = action.payload
    },

    setSelectedSchedule(state, action) {
      state.selectedSchedule = action.payload
    },

    setFilteredSchedules(state, action) {
      state.filteredSchedules = action.payload
    },

    setIsPriceFilterActive(state, action) {
      state.isPriceFilterActive = action.payload
    },

    // Set Origin Charges
    setOriginCharges(state, action) {
      state.originCharges = action.payload
      updatePrice(state)
    },

    // Set Destination Charges
    setDestinationCharges(state, action) {
      state.destinationCharges = action.payload
      updatePrice(state)
    },

    // Set Freight Charges
    setFreightCharges(state, action) {
      state.freightCharges = action.payload
      updatePrice(state)
    },

    setPriceSortOrder(state, action) {
      state.priceSortOrder = action.payload
    },

    setAvailibitySortOrder(state, action) {
      state.availibitySortOrder = action.payload
    },

    updateScheduleAfterPriceFilter(state, action) {},

    setDataIsBeingFiltered(state, action) {
      state.dataIsBeingFiltered = action.payload
    },

    resetState(state) {
      state.isLoading = false
      state.isSchedulesLoading = false
      state.error = null
      state.schedules = []
      state.routes = []
      state.searchFormData = null
      state.selectedSchedule = null
      state.filteredSchedules = []
      state.isPriceFilterActive = false
      state.originCharges = true
      state.destinationCharges = true
      state.freightCharges = true
      state.priceSortOrder = true
      state.availibitySortOrder = true
      state.dataIsBeingFiltered = false
    },
  },
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions
export function getSchedules(token: string, query: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getSchedulesStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get(`/api/v1/schedules/?${query}`, config)
      dispatch(actions.getSchedulesSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getSchedulesFailure(err.detail))
    }
  }
}

// Actions
export function getRoutes(token: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getRoutesStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get('/api/v1/schedules/routes', config)
      dispatch(actions.getRoutesSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getRoutesFailure(err.detail))
    }
  }
}

export function setSearchFormData(data: SearchFormData) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setSearchFormData(data))
  }
}

export function setSelectedSchedule(data: Schedule) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setSelectedSchedule(data))
  }
}

export function setFilteredSchedules(data: Schedule[]) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setFilteredSchedules(data))
  }
}

export function setIsPriceFilterActive(data: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setIsPriceFilterActive(data))
  }
}

export function refillScedules(data: Schedule[]) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.getSchedulesSuccess(data))
  }
}

export function resetScedulesState() {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.resetState())
  }
}

// Set Origin Charges
export function setOriginCharges(data: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setOriginCharges(data))
  }
}

// Set Destination Charges
export function setDestinationCharges(data: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setDestinationCharges(data))
  }
}

// Set Freight Charges
export function setFreightCharges(data: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setFreightCharges(data))
  }
}

export function setPriceSortOrder(data: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setPriceSortOrder(data))
  }
}

export function setAvailibitySortOrder(data: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setAvailibitySortOrder(data))
  }
}

export function setDataIsBeingFiltered(data: boolean) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setDataIsBeingFiltered(data))
  }
}

export function sortSchedulesAccordingToPrice() {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.sortSchedulesAccordingToPrice())
  }
}
