
import { createSlice } from '@reduxjs/toolkit';
import { submitAllServices } from '../../action';

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    loading: false,
    error: null,
    submissionStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitAllServices.pending, (state) => {
        state.loading = true;
        state.submissionStatus = 'pending';
      })
      .addCase(submitAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.submissionStatus = 'success';
      })
      .addCase(submitAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.submissionStatus = 'failed';
      });
  },
});

export default servicesSlice.reducer;
