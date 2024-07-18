import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { postsApi, Post } from '../services/postsApi'

interface LocalPostsState {
  posts: Post[]
}
  
const initialState: LocalPostsState = {
  posts: []
}
  
const localPostsSlice = createSlice({
  name: 'localPosts',
  initialState,
  reducers: {
    addLocalPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload)
    },
    removeLocalPost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload)
    }
  }
})
  
export const { addLocalPost, removeLocalPost } = localPostsSlice.actions
  
export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    localPosts: localPostsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch