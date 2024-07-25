import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
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
export const Cancel = createAsyncThunk(
    'Cancel',
    async (body) => {
        try {
            const response = await axios.post("api/v1/cancel", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const getCancel = createAsyncThunk(
    'getCancel',
    async ({ id }) => {
        try {
            console.log(id)
            const response = await axios.get(`api/v1/cancel/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const GetInvoice = createAsyncThunk(
    'GetInvoice',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/invoice?id=${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const astroOffChat = createAsyncThunk(
    'astroOffChat',
    async (body) => {
        try {
            const response = await axios.post("api/v1/astroOffChat", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const astroGetAllOffChat = createAsyncThunk(
    'astroGetAllOffChat',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/astroGetAllOffChat/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const TokenLogin = createAsyncThunk(
    'TokenLogin',
    async ({ token }) => {
        try {
            const response = await axios.get(`api/v1/astro/${token}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const getSession = createAsyncThunk(
    'getSession',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/session?id=${id}&a=astro`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const userSession = createAsyncThunk(
    'userSession',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post(`api/v1/session/user`, body)
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


export const StartWork = createAsyncThunk(
    'StartWork',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/astro/start/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)



export const AstroStartWork = createAsyncThunk(
    'AstroStartWork',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/astro/start/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)


export const StopWork = createAsyncThunk(
    'StopWork',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post(`api/v1/astro/stop`, body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const AstroStopWork = createAsyncThunk(
    'AstroStopWork',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post(`api/v1/astro/stop`, body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const busy = createAsyncThunk(
    'busy',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post(`api/v1/astro/busy`, body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const FetchChat = createAsyncThunk(
    'fetchChat',
    async ({ _id }) => {
        try {
            const response = await axios.get(`api/v1/chat?myId=${_id}&astro=astro`)
            return response.data
        } catch (err) {
            console.log(err.response.data)
            return err.response.data
        }

    }
)
export const FetchMessage = createAsyncThunk(
    'FetchMessage',
    async ({ id }) => {
        try {
            const response = await axios.post(`api/v1/message/${id}`)
            return response.data
        } catch (err) {
            console.log(err.response.data)
            return err.response.data
        }

    }
)
export const SendMessage = createAsyncThunk(
    'sendMessage',
    async (body) => {
        try {
            const response = await axios.post(`api/v1/message`, body)
            return response.data
        } catch (err) {
            console.log(err.response.data)
            return err.response.data
        }

    }
)
export const CreateChat = createAsyncThunk(
    'CreateChat',
    async (body) => {
        try {
            const response = await axios.post(`api/v1/chat`, body)
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
export const AdminFetchChat = createAsyncThunk(
    'AdminFetchChat',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post("api/v1/AdminFetchChat", body)

            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const StopChat = createAsyncThunk(
    'StopChat',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post(`api/v1/session`, body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
const responseHandler = (state, payload) => {
    if (payload.success) {
        state.user = payload.user
        payload.token && localStorage.setItem("AstroToken", payload.token)
    }
}

const userReducer = createSlice({
    name: "user",
    initialState: { s: {}, successModel: false, astro: {}, ClientRequests: [], chats: [], chat: {}, FetchMessage: [], UserSession: [], allMessages: [], session: [] },
    reducers: {
        ClientRequestsRemove: (state, { payload }) => {
            state.ClientRequests = state.ClientRequests.filter((e) => e._id !== payload)
        },
        ClientRequestsAdd: (state, { payload }) => {
            const b = state.ClientRequests.find((e) => e._id == payload._id)
            if (!b) {
                state.ClientRequests.push(payload)
            }
        },
        MessageHandler: (state, { payload }) => {
            const foundObject = state.allMessages.find(item => item._id === payload._id);
            if (!foundObject) {
                state.allMessages = [...state.allMessages, payload]
            }
        },
        Model: (state) => {
            state.successModel = true
        },
        ModelClose: (state) => {
            state.successModel = false
        },
    },
    extraReducers: {
        [LoginAstro.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astro = payload.astro
                localStorage.setItem("AstroToken", payload.token)
            }
        }, [TokenLogin.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astro = payload.astro
            }
        }, [uploadImage.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astro = payload.astro
            }
        }, [FetchChat.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.chats = payload.chats
            }
        }, [FetchMessage.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.allMessages = payload.messages
            }
        },
        [SendMessage.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.allMessages = [...state.allMessages, payload.message]
            }
        },
        [getSession.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.session = payload.sessions
            }
        },
        [userSession.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.UserSession = payload.sessions
            }
        },
        [CreateChat.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.chat = payload.chat
            }
        },
        [StartWork.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.s = payload.a
            }
        },

    }
}
)
export const { ClientRequestsRemove, ModelClose, ClientRequestsAdd, MessageHandler, Model } = userReducer.actions
export default userReducer.reducer