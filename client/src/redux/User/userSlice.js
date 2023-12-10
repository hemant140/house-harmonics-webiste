import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        resetSignInForm: (state) => {
            state.loading = false
            state.error = null
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, resetSignInForm } = userSlice.actions;

export default userSlice.reducer;