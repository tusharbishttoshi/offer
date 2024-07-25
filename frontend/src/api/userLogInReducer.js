import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
export const SinginUser = createAsyncThunk(
    'SinginUser',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/register", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const offlineChat = createAsyncThunk(
    'offlineChat',
    async (body) => {
        try {
            const response = await axios.post("api/v1/offlineChat", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const userOffChat = createAsyncThunk(
    'userOffChat',
    async (body) => {
        try {
            const response = await axios.post("api/v1/userOffChat", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const userGetAllOffChat = createAsyncThunk(
    'userGetAllOffChat',
    async ({ userId }) => {
        try {
            const response = await axios.get(`api/v1/userGetAllOffChat/${userId}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

const FormData = require('form-data');

export const Horoscopy = createAsyncThunk(
    'Horoscopy',
    async ({ sign }) => {
        try {
            const date = new Date()
            const y = date.getFullYear()
            const m = `0${date.getMonth() + 1}`
            const d = `0${date.getDate()}`
            const t = date.getTimezoneOffset() / -60
            const formData = new FormData();
            formData.append('api_key', '5e76bef6e019b2541ff53db39f407a98');
            formData.append('date', `${y}-${m.slice(-2)}-${d.slice(-2)}`);
            formData.append('sign', sign);
            formData.append('timezone', `${t}`);
            const response = await axios.post("https://divineapi.com/api/1.0/get_daily_horoscope.php", formData);
            return response.data;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
);
export const myHoroscopy = createAsyncThunk(
    'myHoroscopy',
    async ({ sign }) => {
        try {
            const date = new Date()
            const y = date.getFullYear()
            const m = `0${date.getMonth() + 1}`
            const d = `0${date.getDate()}`
            const t = date.getTimezoneOffset() / -60
            const formData = new FormData();
            formData.append('api_key', '5e76bef6e019b2541ff53db39f407a98');
            formData.append('date', `${y}-${m.slice(-2)}-${d.slice(-2)}`);
            formData.append('sign', sign ||"Scorpio");
            formData.append('timezone', `${t}`);
            const response = await axios.post("https://divineapi.com/api/1.0/get_daily_horoscope.php", formData);
            console.log(response)
            return response.data;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
);
export const Week = createAsyncThunk(
    'Week',
    async ({ sign }) => {
        try {
            const date = new Date()
            const y = date.getFullYear()
            const m = `0${date.getMonth() + 1}`
            const d = `0${date.getDate()}`
            const t = date.getTimezoneOffset() / -60
            const formData = new FormData();
            formData.append('api_key', '5e76bef6e019b2541ff53db39f407a98');
            formData.append('week', `current`);
            formData.append('sign', sign ||'Scorpio');
            formData.append('timezone', `${t}`);
            const response = await axios.post("https://divineapi.com/api/1.0/get_weekly_horoscope.php", formData);
            console.log(response)
            return response.data;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
);
export const Month = createAsyncThunk(
    'Month',
    async ({ sign }) => {
        try {
            const date = new Date()
            const t = date.getTimezoneOffset() / -60
            const formData = new FormData();
            formData.append('api_key', '5e76bef6e019b2541ff53db39f407a98');
            formData.append('month', `current`);
            formData.append('sign', sign ||'Scorpio');
            formData.append('timezone', `${t}`);
            const response = await axios.post("https://divineapi.com/api/1.0/get_monthly_horoscope.php", formData);
            console.log(response)
            return response.data;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
);
export const Year = createAsyncThunk(
    'Year',
    async ({ sign }) => {
        try {
            const date = new Date()
            const t = date.getTimezoneOffset() / -60
            const formData = new FormData();
            formData.append('api_key', '5e76bef6e019b2541ff53db39f407a98');
            formData.append('year', `current`);
            formData.append('sign', sign ||'Scorpio');
            formData.append('timezone', `${t}`);
            const response = await axios.post("https://divineapi.com/api/1.0/get_yearly_horoscope.php", formData);
            console.log(response)
            return response.data;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
);
export const UYear = createAsyncThunk(
    'UYear',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/year", body);
            return response.data;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    }
);
export const UMonth = createAsyncThunk(
    'UMonth',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/month", body);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
);
export const UWeek = createAsyncThunk(
    'UWeek',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/week", body);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
);
export const Taro = createAsyncThunk(
    'Taro',
    async () => {
        try {
            const formData = new FormData();
            formData.append('api_key', '5e76bef6e019b2541ff53db39f407a98');
            const response = await axios.post("https://divineapi.com/api/1.0/get_daily_tarot.php", formData);
            return response.data;
        } catch (err) {
            console.error('taro:', err);
            throw err;
        }
    }
);
export const userTaro = createAsyncThunk(
    'userTaro',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/taro", body);
            return response.data;
        } catch (err) {
            console.error('taro:', err);
            throw err;
        }
    }
);
export const VerifyEmail = createAsyncThunk(
    'VerifyEmail',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/verify", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)

export const TokenLogin = createAsyncThunk(
    'TokenLogin',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/tokenLogin", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const LoginUser = createAsyncThunk(
    'LoginUser',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/login", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const Recharge = createAsyncThunk(
    'recharge',
    async (body) => {
        try {
            const response = await axios.post("api/v1/recharge", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const RechargeHistory = createAsyncThunk(
    'RechargeHistory',
    async (body) => {
        try {
            const response = await axios.get(`api/v1/recharge?userID=${body.id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const ApplyForAstro = createAsyncThunk(
    'ApplyForAstro',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post("api/v1/astro", body)
            return await response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const UpdateUserProfile = createAsyncThunk(
    'UpdateUserProfile',
    async (body) => {
        try {
            console.log(body)
            const response = await axios.post("api/v1/user/update", body)
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
            console.log(err.response.data)
            return err.response.data
        }

    }
)
// un tested

export const UpdateUser = createAsyncThunk(
    'UpdateUser',
    async (body) => {
        try {
            const response = await axios.post("api/v1/ApplyForWorker", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)


export const SearchAstro = createAsyncThunk(
    'SearchAstro',
    async (body) => {
        try {
            const response = await axios.post("api/v1/astro/search", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const Astrologer = createAsyncThunk(
    'Astrologer',
    async ({ id }) => {
        try {
            const response = await axios.get(`api/v1/astro/GetAstrologer/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
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
export const ForgetPass = createAsyncThunk(
    'ForgetPass',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/forgotPassword", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const resetPassword = createAsyncThunk(
    'resetPassword',
    async (body) => {
        try {
            const response = await axios.post("api/v1/user/resetPassword", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
const responseHandler = (state, payload) => {
    if (payload.success) {
        state.user = payload.user
        // payload.token && localStorage.setItem("token", payload.token)
    }
}

const userReducer = createSlice({
    name: "user",
    initialState: { user: {}, astrologers: [], userReports: [], astrologer: {}, popup: false, popupMessage: {}, model: true },
    reducers: {
        PopupState: (state, action) => {
            state.popup = true
            state.popupMessage = action.payload
        },
        ClosePopupState: (state) => {
            state.popup = false
            state.popupMessage = {}
        },
    },
    extraReducers: {
        [VerifyEmail.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        },  [UMonth.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        },  [UWeek.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        },  [UYear.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        },
        [LoginUser.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        }, [userTaro.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        }, [Recharge.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        }, [resetPassword.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        },
        // [SinginUser.fulfilled]: (state, { payload }) => {
        //     if (payload.success) {
        //         state.user = payload.user
        //         payload.token && localStorage.setItem("token", payload.token)
        //     }
        // },
        [ApplyForAstro.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        },
        [UpdateUserProfile.fulfilled]: (state, { payload }) => {
            responseHandler(state, payload)
        },
        [TokenLogin.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.user = payload.user
            }
        },
        [Astrologer.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astrologer = payload.astrologer
            }
        },

        [SearchAstro.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astrologers = payload.astrologers
            }
        }, [GetAstrologers.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.astrologers = payload.astrologers
            }
        },

    }
}
)
export const { PopupState, ClosePopupState } = userReducer.actions
export default userReducer.reducer