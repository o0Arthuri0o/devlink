import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = true

export const loadingSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    updateLoading:  (state, action: PayloadAction<boolean>) => {
        state = action.payload
        return state
    }
  },
})


export const { updateLoading } = loadingSlice.actions

export default loadingSlice.reducer