import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type

export const homeSlice = createSlice({
  name: 'home',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState:{
    url:{},
    genres:{}
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
  },
  getGenres: (state, action) => {
      state.genres = action.payload;
  },
  },
})

export const { getApiConfiguration, getGenres} = homeSlice.actions

export default homeSlice.reducer;