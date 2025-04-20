import { createSlice } from '@reduxjs/toolkit';
import { fetchYears } from '../../action';

const yearSlice = createSlice({
  name: 'years',
  initialState: {
    years: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.loading = false;
        state.years = action.payload.years;
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default yearSlice.reducer;
