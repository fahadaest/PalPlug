import { createSlice } from '@reduxjs/toolkit';
import { fetchColleges } from '../../action';

const initialState = {
  colleges: [],
  loading: false,
  error: null,
};

const collegeSlice = createSlice({
  name: 'colleges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColleges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.loading = false;
        state.colleges = action.payload["Colleges names"] || [];


      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default collegeSlice.reducer;