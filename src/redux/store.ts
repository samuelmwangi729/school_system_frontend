import{combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist'


const persistConfig = {
  key: 'root',
  version:1,
  storage,
  whitelist: ['user'] // only persist the 'user' slice
}

const baseReducers = combineReducers({
    user:userReducer
})

const persistedReducers = persistReducer(persistConfig,baseReducers)
const store = configureStore({
    reducer:persistedReducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store