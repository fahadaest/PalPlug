import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '@/axios/index';
import { getRoute } from '@/api/index';

export const submitProfileData = createAsyncThunk(
  'profileSubmit/submitProfileData',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (payload.id) {
        formData.append('id', payload.id);
      }
      const verifiedPhone = payload.phone; 
      if (verifiedPhone) {
        formData.append('phone', verifiedPhone);
      }
      formData.append('first_name', payload.firstName ?? payload.first_name);
      formData.append('last_name', payload.lastName ?? payload.last_name);

      if (payload.description !== undefined) {
        formData.append('description', payload.description);
      }

      if (payload.profilePicture) {
        formData.append('profile_image', payload.profilePicture);
      }

      const workEmail =
        payload.work_email ||
        payload.firstName?.work_email ||  
        (payload.professionalInfo && payload.professionalInfo.workEmail);
      if (workEmail) {
        formData.append('work_email', workEmail);
      }

      if (payload.professionalInfo) {
        if (payload.professionalInfo.occupation) {
          formData.append('occupation', payload.professionalInfo.occupation);
        }
        if (payload.professionalInfo.employer) {
          formData.append('employer', payload.professionalInfo.employer);
        }
        if (payload.professionalInfo.collegesArray) {
          formData.append('colleges', JSON.stringify(payload.professionalInfo.collegesArray));
        }
        if (payload.professionalInfo.certificationsArray) {
          formData.append('certifications', JSON.stringify(payload.professionalInfo.certificationsArray));
        }
      }

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
