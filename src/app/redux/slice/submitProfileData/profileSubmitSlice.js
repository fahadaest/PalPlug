import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '@/axios/index';
import { getRoute } from '@/api/index';

export const submitProfileData = createAsyncThunk(
  'profileSubmit/submitProfileData',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('first_name', payload.firstName ?? payload.first_name);
      formData.append('last_name',  payload.lastName  ?? payload.last_name);
      formData.append('description', payload.description);

      const workEmail =
        payload.professionalInfo?.workEmail?? payload.work_email;
      formData.append('work_email', workEmail);

      if (payload.profilePicture) {
        formData.append('profile_image', payload.profilePicture); 
      }

      formData.append('occupation',payload.professionalInfo?.occupation??'');
      formData.append('employer',payload.professionalInfo?.employer??'');
      const prof = payload.professionalInfo || {};
      const educationArray      = prof.collegesArray       || [];
      formData.append('colleges', JSON.stringify(educationArray));
      const certificationsArray = prof.certificationsArray || [];
      formData.append('certifications', JSON.stringify(certificationsArray));

      if (payload.services) {
        formData.append('services', JSON.stringify(payload.services));
      }
      if (payload.order_requirements) {
        formData.append('order_requirements', JSON.stringify(payload.order_requirements));
      }
      if (payload.form_w9_confirmation) {
        formData.append('form_w9_confirmation', JSON.stringify(payload.form_w9_confirmation));
      }

      const route = getRoute('submitProfile');
      const response = await postRequest(route, formData, true);
      return response;
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
