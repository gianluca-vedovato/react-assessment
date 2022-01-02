import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { fetchCount } from './usersAPI';

export interface usersState {
  value: User[]
}

interface User {
  name: string,
  friends: string[]
}

const initialState: usersState = {
  value: []
}

export const incrementAsync = createAsyncThunk(
  'users/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount)
    return response.data;
  }
);

const add = (payload: string|User) => {
  return new Promise<{ data: User }>((resolve, reject) => {
    const name: string = typeof payload === 'string'
        ? payload
        : payload.name

      const friends: string[] = typeof payload === 'string'
        ? []
        : payload.friends

      const isSuccess = Math.random() > 0.32
      if (isSuccess) return resolve({ data: { name, friends } })
      return reject(false)
  })
}

export const addUser = createAsyncThunk(
  'users/addUser',
  async (payload: string|User) => {
    const response = await add(payload)
    return response.data
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<{ searchFor: string, replaceWith: string, friends?: string[] }>) => {
      const { searchFor, replaceWith, friends } = action.payload
      const user = state.value.find((u) => u.name === searchFor )
      if (!user) return
      user.name = replaceWith
      if (friends) {
        user.friends = friends
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        state.value.push(action.payload)
      })
  }
})

export const { editUser } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users.value;

export default usersSlice.reducer;
