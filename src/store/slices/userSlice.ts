import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id: string | null;
  name: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string | null;
};

const initialState: UserState = {
  id: null,
  name: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<{ id: string; name: string }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    clearUser(state) {
      state.id = null;
      state.name = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setUser, clearUser, setError } = slice.actions;
export const userReducer = slice.reducer;
