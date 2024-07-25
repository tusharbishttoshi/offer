import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
export const GetUsers = createAsyncThunk(
    'GetUsers',
    async () => {
        try {
            const response = await axios.get("api/v1/user/allUserGet")

            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const invoiceg = createAsyncThunk(
    'invoiceg',
    async (body) => {
        try {
            const response = await axios.post("api/v1/invoice", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const LogActive = createAsyncThunk(
    'LogActive',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/astro/log/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const AdminFetchChat = createAsyncThunk(
    'AdminFetchChat',
    async (body) => {
        try {
            const response = await axios.post("api/v1/AdminFetchChat", body)

            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)

export const GetAstrologers = createAsyncThunk(
    'GetAstrologers',
    async () => {
        try {
            const response = await axios.get("api/v1/astro")
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const AddAstrologers = createAsyncThunk(
    'AddAstrologers',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post("api/v1/astro/add", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const UpdateAstrologers = createAsyncThunk(
    'UpdateAstrologers',
    async (body) => {
        try {
            const response = await axios.post("api/v1/astro/update", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const deleteAstrologers = createAsyncThunk(
    'deleteAstrologers',
    async (body) => {
        try {
            const response = await axios.post("api/v1/astro/delete", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const getSession = createAsyncThunk(
    'getSession',
    async (body) => {
        try {
            const response = await axios.get("api/v1/session/all", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const getTransition = createAsyncThunk(
    'getTransition',
    async (body) => {
        try {
            const response = await axios.get("api/v1/recharge/all", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const uploadImage = createAsyncThunk(
    'uploadImage',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post(`api/v1/astro/upload`, body)
            return response.data

        } catch (err) {
            return err.response.data
        }

    }
)
export const updatePass = createAsyncThunk(
    'updatePass',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post(`api/v1/astro/updatePass`, body)
            return response.data

        } catch (err) {
            return err.response.data
        }

    }
)
export const getUserSession = createAsyncThunk(
    'getUserSession',
    async ({ id, a }) => {
        try {
            let response
            if (a) {
                response = await axios.get(`api/v1/session?id=${id}&a=${a}`)
            }
            else {
                response = await axios.get(`api/v1/session?id=${id}`)
            }
            return response?.data
        } catch (err) {
            console.log(err.response.data)
            return err.response.data
        }

    }
)

export const LoginAstro = createAsyncThunk(
    'LoginAstro',
    async (body) => {
        try {
            const response = await axios.post("api/v1/astro/login", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

const userSlice = createSlice({
    name: "userSlice",
    initialState: { astrologers: [], astrologerRequest: [], users: [], sessions: [], transition: [] },
    extraReducers: {
        [GetUsers.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.users = payload.users
            }
        },
        [getSession.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.sessions = payload.sessions
            }
        }, [uploadImage.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                const a = state.astrologers
                const b = a.filter((e) => e._id !== payload.astro._id)
                state.astrologers = [...b, payload.astro]
            }
        },
        [getTransition.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.transition = payload.rechargeHistory
            }
        },
        [GetAstrologers.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astrologers = payload.astrologers
            }
        },
        [deleteAstrologers.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astrologers = payload.astrologers
            }
        },
        [AddAstrologers.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astrologers = payload.astrologers
            }
        },
    }
}
)
export default userSlice.reducer