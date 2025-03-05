import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart'
export const makeStore = () => {
  return configureStore({
    reducer: { cart: cartReducer.reducer}
  })
}