import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '@/axios/index';
import { getRoute } from '@/api/index';

const appendField = (formData, key, value, transform) => {
  if (value !== undefined && value !== null) {
    formData.append(key, transform ? transform(value) : value);
  }
};

export const submitProfileData = createAsyncThunk(
  'profileSubmit/submitProfileData',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      appendField(formData, 'id', payload.id);
      appendField(formData, 'phone', payload.phone);
      appendField(formData, 'first_name', payload.firstName ?? payload.first_name);
      appendField(formData, 'last_name', payload.lastName ?? payload.last_name);
      appendField(formData, 'description', payload.description);
      appendField(formData, 'profile_image', payload.profilePicture);


      const workEmail =
        payload.work_email ||
        payload.firstName?.work_email ||
        (payload.professionalInfo && payload.professionalInfo.workEmail);
      appendField(formData, 'work_email', workEmail);

      const { professionalInfo } = payload;
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

      appendField(formData, 'services', payload.services, JSON.stringify);
      appendField(formData, 'order_requirements', payload.order_requirements, JSON.stringify);
      appendField(formData, 'form_w9_confirmation', payload.form_w9_confirmation, JSON.stringify);


      const route = getRoute('submitProfile');
      const response = await postRequest(route, formData, true);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || 'Unknown error'
      );
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
