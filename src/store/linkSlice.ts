import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type LinkCard = {
    user_email: string
    title: string,
    link: string,
    color: string,
    text_color: string,
    id: string,
}

const initialState: LinkCard[] = []


export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    updateLink: (state, action: PayloadAction<LinkCard>) => {
        const updatedLink = action.payload;
        state.forEach((link) => {
            if(link.id === updatedLink.id) {
                link.title = updatedLink.title
                link.link = updatedLink.link
                link.color = updatedLink.color
                link.text_color = updatedLink.text_color
            }
        })
    },
    add: (state, action: PayloadAction<LinkCard>) => {
        const newLink = action.payload
        state.push(newLink)
    },
    getLinks: (state, action: PayloadAction<LinkCard[]>) => {
        state.length = 0
        state.push(...action.payload)
    },
    removeLink: (state, action: PayloadAction<string>) =>{
        for (let indexLink = 0; indexLink < state.length; indexLink++){
            if(state[indexLink].id === action.payload) {
                state.splice(indexLink, 1)
            }
        }
    }
  },
})


export const { updateLink, add, getLinks, removeLink } = linkSlice.actions

export default linkSlice.reducer