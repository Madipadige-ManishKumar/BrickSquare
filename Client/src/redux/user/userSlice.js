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
    }
});

export const {signInStart,signInSuccess,signInFailure} = userSlice.actions;
    
export default userSlice.reducer;