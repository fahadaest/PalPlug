import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '@/axios/index';

export const fetchUserDetailsByEmail = createAsyncThunk(
  'userDetails/fetchByEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await getRequest(`submit-profile/2/?work_email=${encodeURIComponent(email)}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetailsByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetailsByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserDetailsByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetailsSlice.reducer;