import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
export const GetCategory = createAsyncThunk(
    'GetCategory',
    async () => {
        try {
            const response = await axios.get("api/v1/category")
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const AddCategory = createAsyncThunk(
    'AddCategory',
    async (body) => {
        try {
            const response = await axios.post("api/v1/category", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const UpdateCategory = createAsyncThunk(
    'UpdateCategory',
    async (body) => {
        try {
            const response = await axios.put("api/v1/category", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const DeleteCategory = createAsyncThunk(
    'DeleteCategory',
    async ({ id }) => {
        try {
            const response = await axios.delete(`api/v1/category/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)



const categorySlice = createSlice({
    name: "Category",
    initialState: { categories: [] },
    extraReducers: {
        [AddCategory.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.categories = [...state.categories, payload.category]
            } else {
                alert(payload.message)
            }
        },
        [DeleteCategory.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.categories = payload.categories
            } else {
                alert(payload.message)
            }
        },
        [UpdateCategory.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                // state.categories = payload.category
            } else {
                alert(payload.message)
            }
        },

        [GetCategory.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.categories = payload.categories
            } else {
                alert(payload.message)
            }
        },

    }
}
)
export default categorySlice.reducer