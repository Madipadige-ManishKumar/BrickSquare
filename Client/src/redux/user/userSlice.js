import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error:null,
    loader:false,
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loader = true;
        },
        signInSuccess:(state,action)=>{
            state.loader = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFailure:(state,action)=>{
            state.loader = false;
            state.error = action.payload;
        },
        updateUserStart(state) {
            state.loading = true;
        },
        updateUserSuccess(state, action) {
            state.loading = false;
            state.currentUser = action.payload;
        },
        updateUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart:(state)=>{
            state.loader = true;
        },
        deleteUserSuccess:(state,action)=>{
            state.loader = false;
            state.currentUser = null;
            state.error = null;
        },
        deleteUserFailure:(state,action)=>{
            state.loader = false;
            state.error = action.payload;
        },
        SignOutStart:(state)=>{
            state.loader = true;
        },
        SignOutSuccess:(state,action)=>{
            state.loader = false;
            state.currentUser = null;
            state.error = null;
        },
        SignOutFailure:(state,action)=>{
            state.loader = false;
            state.error = action.payload;
        },
    }
});

export const {signInStart,
    signInSuccess,
    signInFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    SignOutStart,
    SignOutSuccess,
    SignOutFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} = userSlice.actions;
    
export default userSlice.reducer;