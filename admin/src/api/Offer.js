import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
export const GetOffer = createAsyncThunk(
    'GetOffer',
    async () => {
        try {
            const response = await axios.get("api/v1/offer")
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const AddOffer = createAsyncThunk(
    'AddOffer',
    async (body) => {
        try {
            const response = await axios.post("api/v1/offer", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const UpdateOffer = createAsyncThunk(
    'UpdateOffer',
    async (body) => {
        try {
            const response = await axios.put("api/v1/offer", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const DeleteOffer = createAsyncThunk(
    'DeleteOffer',
    async ({ id }) => {
        try {
            const response = await axios.delete(`api/v1/offer/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

const offerSlice = createSlice({
    name: "Offer",
    initialState: { categories: [] },
    extraReducers: {
        [AddOffer.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.categories = [...state.categories, payload.category]
            } else {
                alert(payload.message)
            }
        },
        [DeleteOffer.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.categories = payload.categories
            } else {
                alert(payload.message)
            }
        },
        [UpdateOffer.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                // state.categories = payload.category
            } else {
                alert(payload.message)
            }
        },

        [GetOffer.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.categories = payload.categories
            } else {
                alert(payload.message)
            }
        },

    }
}
)

export default offerSlice.reducer