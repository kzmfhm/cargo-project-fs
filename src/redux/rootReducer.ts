import { combineReducers } from 'redux'

// slices
import accountsReducer from './slices/accounts'
import shipmentsReducer from './slices/shipments'
import overviewReducer from './slices/overview'
import analyticsReducer from './slices/analytics'
import transportationReducer from './slices/transportation'
import schedulesReducer from './slices/schedules'
import bookingsReducer from './slices/bookings'
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  keyPrefix: 'redux-',
  whitelist: [],
}

const rootReducer = combineReducers({
  // slices
  accounts: accountsReducer,
  shipments: shipmentsReducer,
  overview: overviewReducer,
  analytics: analyticsReducer,
  transportation: transportationReducer,
  schedules: schedulesReducer,
  bookings: bookingsReducer,
})

export { rootPersistConfig, rootReducer }
