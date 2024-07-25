import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
export const GetRole = createAsyncThunk(
    'GetRole',
    async () => {
        try {
            const response = await axios.get("api/v1/role")
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const AddRole = createAsyncThunk(
    'AddRole',
    async (body) => {
        console.log(body)
        try {
            const response = await axios.post("api/v1/role", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const UpdateRole = createAsyncThunk(
    'UpdateRole',
    async (body) => {
        try {
            const response = await axios.put("api/v1/role", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const DeleteRole = createAsyncThunk(
    'DeleteRole',
    async ({ id }) => {
        try {
            const response = await axios.delete(`api/v1/role/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)



const RoleSlice = createSlice({
    name: "Role",
    initialState: { roles: [] },
    extraReducers: {
        [AddRole.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.roles = [...state.roles, payload.role]
            } else {
                alert(payload.message)
            }
        },
        [DeleteRole.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.roles = payload.roles
            } else {
                alert(payload.message)
            }
        },
        [UpdateRole.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                // state.roles = payload.role
            } else {
                alert(payload.message)
            }
        },

        [GetRole.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.roles = payload.roles
            } else {
                alert(payload.message)
            }
        },

    }
}
)
export default RoleSlice.reducer