import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signIn=createAsyncThunk(
    'user/signIn',
    async(userCredentials)=>{
        const request=await fetch(
                  `http://localhost:9000/signin/${userCredentials.username}/${userCredentials.password}`,
                  {
                    method: "GET",
                  }
                );

                if (request.ok) {
                  const data = await request.json();
                  localStorage.setItem('user', JSON.stringify(data));
                  return data;
                }
    }
);

const userSlice=createSlice({
    name:'user',
    initialState:{
        loading:false,
        user:null,
        userType: null, 
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(signIn.pending, (state)=>{
            state.loading=true;
            state.user= null;
            state.userType=null;
            state.error=null;
        }).addCase(signIn.fulfilled,(state,action)=>{
            state.loading=false;
            state.user= action.payload;
            state.userType = action.payload.userType;
            state.error=null;
        }).addCase(signIn.rejected,(state, action)=>{
            state.loading=false;
            state.user= null;
            state.userType=null;
            console.log(action.error.message);
            if(action.error.message==='Request failed with status code 401'){
                state.error='Access Denied! Invalid Credentials'
            }
            else{
                state.error= action.error.message;
            }
        })
    }
});

export default userSlice.reducer;
