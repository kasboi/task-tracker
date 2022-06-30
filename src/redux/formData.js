import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  description: '',
  date: '',
  time: '',
  timeZone: '',
  user_id: 'user_4ee4cf67ad474a27988bc0afb84cf472'
}

export const formData = createSlice({
  name: 'form',
  initialState,
  reducers: {
    descAction: (state, action) => {
      state.description = action.payload
    },
    dateAction: (state, action) => {
      state.date = action.payload
    },
    timeAction: (state, action) => {
      state.time = action.payload
    },
    timeZoneAction: (state, action) => {
      state.timeZone = action.payload
    },
    user_idAction: (state, action) => {
      state.time = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { descAction, dateAction, timeAction, timeZoneAction, user_idAction} = formData.actions

export default formData.reducer