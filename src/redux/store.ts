import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './rootReducer'
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: { users: UsersState}
export type AppDispatch = typeof store.dispatch
