import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        accessToken: null,
    },
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.accessToken = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setUser } =
    userSlice.actions;

export default userSlice.reducer;
