import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type Profile = {
    name: string,
    surname: string,
    email: string,
    imgSrc: string,
    timeStamp: string
}


const initialState = {
    name:'',
    surname: '',
    email: '',
    imgSrc: '',
    timeStamp: ''
}


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Profile>) => {
        state.email = action.payload.email
        state.name = action.payload.name
        state.surname = action.payload.surname
        state.imgSrc = action.payload.imgSrc
        state.timeStamp = action.payload.timeStamp
    },
  },
})


export const { update } = profileSlice.actions

export default profileSlice.reducer