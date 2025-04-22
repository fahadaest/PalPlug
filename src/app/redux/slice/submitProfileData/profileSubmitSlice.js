import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '@/axios/index';
import { getRoute } from '@/api/index';
import axios from 'axios';

const appendField = (formData, key, value, transform) => {
  if (value !== undefined && value !== null) {
    formData.append(key, transform ? transform(value) : value);
  }
};

export const submitProfileData = createAsyncThunk(
  'profile/submitProfileData',
  async (profileData, { rejectWithValue }) => {
    try {
      const endpoint = profileData.profile_type === 1 ? '/api/submit-profile/1/' : '/api/submit-profile/2/';
      const response = await axios.post(endpoint, profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const profileSubmitSlice = createSlice({
  name: 'profileSubmit',
  initialState: {
    loading: false,
    error: null,
    success: false,
    data: null,
  },
  reducers: {
    resetProfileSubmit: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(submitProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetProfileSubmit } = profileSubmitSlice.actions;
export default profileSubmitSlice.reducer;
