import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postsApi, Post } from '../services/postsApi';

interface LocalPostsState {
  posts: Post[];
}

interface ApiPostUpdatesState {
  [id: number]: Partial<Post> | null;
}

const initialLocalPostsState: LocalPostsState = {
  posts: []
};

const initialApiPostUpdatesState: ApiPostUpdatesState = {};

const localPostsSlice = createSlice({
  name: 'localPosts',
  initialState: initialLocalPostsState,
  reducers: {
    addLocalPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    removeLocalPost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updateLocalPost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    }
  }
});

const apiPostUpdatesSlice = createSlice({
  name: 'apiPostUpdates',
  initialState: initialApiPostUpdatesState,
  reducers: {
    updateApiPost: (state, action: PayloadAction<Post>) => {
      state[action.payload.id] = {
        ...state[action.payload.id],
        ...action.payload
      };
    },
    deleteApiPost: (state, action: PayloadAction<number>) => {
      state[action.payload] = null;
    }
  }
});

export const { addLocalPost, removeLocalPost, updateLocalPost } = localPostsSlice.actions;
export const { updateApiPost, deleteApiPost } = apiPostUpdatesSlice.actions;

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    localPosts: localPostsSlice.reducer,
    apiPostUpdates: apiPostUpdatesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;