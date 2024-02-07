import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'


export type Profile = {
    id: string
    name: string,
    surname: string,
    email: string,
    imgSrc: string | ArrayBuffer,
    file: any
}

type ProfileFromDB = {
  id: string
  name: string,
  surname: string,
  email: string,
  user_id:string
}

const initialState: Profile = {
    id: "",
    name:'',
    surname: '',
    email: '',
    imgSrc: '',
    file: null
}


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<{ type: keyof Profile; data: Profile[keyof Profile] }>) => {
      for (let i in state) {
        if (i === action.payload.type) {
          if (i === 'imgSrc') {
            state[i] = action.payload.data as string & ArrayBuffer // явное приведение типа
          } else {
            state[i] = action.payload.data as string
          }
        }
      }
    },
    getProfile: (state, action: PayloadAction<ProfileFromDB>) => {
      state.name = action.payload.name
      state.surname = action.payload.surname
      state.email = action.payload.email
      state.id = action.payload.id
    }
  },
})




export const { update, getProfile } = profileSlice.actions

export default profileSlice.reducer