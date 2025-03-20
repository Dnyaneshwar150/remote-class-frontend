import { configureStore } from '@reduxjs/toolkit'
import { remoteClassApi } from '../services/api/apiSlice'

export const store = configureStore({
    reducer: {
        [remoteClassApi.reducerPath]: remoteClassApi.reducer, // Add API reducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(remoteClassApi.middleware), // Add API middleware
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;