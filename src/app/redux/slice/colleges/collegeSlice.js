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
        // Update this line based on actual API response structure
        state.colleges = action.payload; // Direct array response or action.payload.colleges
        // state.colleges = action.payload.colleges;
        // state.colleges = action.payload["colleges names"] || [];


      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default collegeSlice.reducer;