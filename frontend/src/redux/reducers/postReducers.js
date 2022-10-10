import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts :[],
    loading: false,
    success: false,
    error: null,
}

const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {
        getPostsRequest: (state) => {
            state.loading = true;
        },

        getPostsSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.posts = action.payload
        },

        getPostsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        deletePostRequest: (state, action) => {
            state.loading = true;
        },
        deletePostSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.posts = state.posts.filter(post => post._id !== action.payload)
        },
        deletePostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {getPostsRequest, getPostsSuccess, getPostsFail, deletePostSuccess, deletePostFail, deletePostRequest} = postSlice.actions;

export default postSlice.reducer;


export const getPostsfetch = () => async (dispatch) => {
    dispatch(getPostsRequest());

    try {
        const result = await axios.get("http://localhost:5000/api/post");
        console.log(result.data.data, "The Result from Database");
        dispatch(getPostsSuccess(result.data.data))
    } catch(error) {
        console.log(error);
        dispatch(getPostsFail(error))
    }
}


export const deletePost = (id) =>  async (dispatch) =>{
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    dispatch(deletePostRequest());
    try {
        const result = await axios.delete(`http://localhost:5000/api/post/${id}`, config);
        console.log(result, "The Result from Database");
        dispatch(deletePostSuccess(result))

    }catch (error) {
        console.log(error);
        dispatch(deletePostFail(error))
    }
}