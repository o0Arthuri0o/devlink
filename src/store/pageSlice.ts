import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = 'links'

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    updatePage:  (state, action: PayloadAction<string>) => {
        state = action.payload
        return state
    }
  },
})


export const { updatePage } = pageSlice.actions

export default pageSlice.reducer