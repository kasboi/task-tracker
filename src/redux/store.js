import { configureStore } from '@reduxjs/toolkit'
import userReducer from './fetchUsers'
import formReducer from './formData'

const store = configureStore({
  reducer: {
    user: userReducer,
    form: formReducer
  }
})

export default store;