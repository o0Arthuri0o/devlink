import { configureStore } from '@reduxjs/toolkit'
import linkReducer from './linkSlice'
import profileReducer from './profileSlice'
import pageReducer from './pageSlice'

export const store = configureStore({
  reducer: {
    link: linkReducer,
    profile: profileReducer,
    page: pageReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch