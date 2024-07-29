import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
export const GetBlog = createAsyncThunk(
    'GetBlog',
    async () => {
        try {
            const response = await axios.get("api/v1/blog")
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const GetBlogById = createAsyncThunk(
    'GetBlogById',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/blog/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const MyBlog = createAsyncThunk(
    'MyBlog',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/myBlog/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const AddBlog = createAsyncThunk(
    'AddBlog',
    async (body) => {
        try {
            const response = await axios.post("api/v1/blog", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const UpdateBlog = createAsyncThunk(
    'UpdateBlog',
    async (body) => {
        try {
            const response = await axios.put("api/v1/blog", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const DeleteBlog = createAsyncThunk(
    'DeleteBlog',
    async ({ id }) => {
        try {
            const response = await axios.delete(`api/v1/blog/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)



const blogSlice = createSlice({
    name: "Blog",
    initialState: { blogs: [], myBlog: [], oneBlog:{} },
    extraReducers: {
        [AddBlog.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.blogs = [...state.blogs, payload.blog]
            } else {
                alert(payload.message)
            }
        },

        [UpdateBlog.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                // state.blogs = payload.blog
            } else {
                alert(payload.message)
            }
        },

        [GetBlog.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.blogs = payload.blogs
            } else {
                alert(payload.message)
            }
        },
        [MyBlog.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.myBlog = payload.blogs
            } else {
                alert(payload.message)
            }
        },
        [GetBlogById.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.oneBlog = payload.blog
            } else {
                alert(payload.message)
            }
        },

    }
}
)
export default blogSlice.reducer