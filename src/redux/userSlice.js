import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:'users',
    initialState: {
      userData:{}
    },
    reducers:{
       getUserData:(state,action)=>{
            state.userData = action.payload
    },
}})
export const {getUserData} = userSlice.actions;
export default userSlice.reducer