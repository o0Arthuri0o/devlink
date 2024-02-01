import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type Profile = {
    name: string,
    surname: string,
    email: string,
    imgSrc: string | ArrayBuffer,
    timeStamp: string
}


const initialState: Profile = {
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
  },
})




export const { update } = profileSlice.actions

export default profileSlice.reducer