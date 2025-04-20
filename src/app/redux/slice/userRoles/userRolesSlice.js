import { createSlice } from '@reduxjs/toolkit';
import { fetchUserRoles } from '@/app/redux/action';

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const userRolesSlice = createSlice({
  name: 'userRoles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = [...action.payload];
      })
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userRolesSlice.reducer;
