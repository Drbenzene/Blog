import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user :[],
    loading: false,
    success: false,
    error: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        loginUserRequest: (state) => {
            state.loading = true;
        },

        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload
        },

        loginUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export const {loginUserRequest, loginUserSuccess, loginUserFail} = userSlice.actions;

export const loginUser = (form) => async (dispatch) => {
    dispatch(loginUserRequest());

    const config = {
        headers: {
            "Content-type": "application/json"

        }
    }
    
    try {
        const result = await axios.post("http://localhost:5000/api/users/login", form , config);
        console.log(result, "The Result from Database");
        dispatch(loginUserSuccess(result.data))

    } catch(error) {
        console.log(error);
        dispatch(loginUserFail(error.message))
    }
}



export default userSlice.reducer;