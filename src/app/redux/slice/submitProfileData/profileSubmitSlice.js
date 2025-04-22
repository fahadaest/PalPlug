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
      const formData = new FormData();
      
      appendField(formData, 'id', profileData.id);
      appendField(formData, 'phone', profileData.phone);
      appendField(formData, 'first_name', profileData.firstName ?? profileData.first_name);
      appendField(formData, 'last_name', profileData.lastName ?? profileData.last_name);
      appendField(formData, 'description', profileData.description);
      appendField(formData, 'profile_image', profileData.profilePicture);
      appendField(formData, 'work_email', profileData.work_email);
      appendField(formData, 'profile_type', profileData.profile_type);

      const { professionalInfo } = profileData;
      if (professionalInfo) {
        const { occupation, employer, collegesArray, certificationsArray } = professionalInfo;
        if (occupation && occupation.trim() !== '') {
          appendField(formData, 'occupation', occupation);
        }
        if (employer && employer.trim() !== '') {
          appendField(formData, 'employer', employer);
        }
        appendField(formData, 'colleges', collegesArray, JSON.stringify);
        appendField(formData, 'certifications', certificationsArray, JSON.stringify);
      }

      appendField(formData, 'services', profileData.services, JSON.stringify);
      appendField(formData, 'order_requirements', profileData.order_requirements, JSON.stringify);
      appendField(formData, 'form_w9_confirmation', profileData.form_w9_confirmation, JSON.stringify);

      const route = getRoute('submitProfile', profileData.profile_type);
      const response = await postRequest(route, formData, true);
      
      return {
        data: response,
        profile_type: profileData.profile_type
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Unknown error');
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
    profile_type: null,
  },
  reducers: {
    resetProfileSubmit: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.data = null;
      state.profile_type = null;
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
        state.data = action.payload.data;
        state.profile_type = action.payload.profile_type;
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
