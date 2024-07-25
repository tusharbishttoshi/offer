import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const GetAdminUser = createAsyncThunk("GetAdminUser", async () => {
  try {
    const response = await axios.get("api/v1/adminUser");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const AddAdminUser = createAsyncThunk("AddAdminUser", async (body) => {
  try {
    const response = await axios.post("api/v1/adminUser", body);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const UpdateAdminUser = createAsyncThunk(
  "UpdateAdminUser",
  async (body) => {
    try {
      const response = await axios.post("api/v1/adminUser/update", body);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
export const DeleteAdminUser = createAsyncThunk(
  "DeleteAdminUser",
  async ({ id }) => {
    try {
      const response = await axios.delete(`api/v1/adminUser/${id}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
export const LoginAdminUser = createAsyncThunk(
  "LoginAdminUser",
  async (body) => {
    try {
      const response = await axios.post("api/v1/adminUser/login", body);
      let Data = response.data;
      let adminUser = Data?.adminUser;
      localStorage.setItem("AstroAdminToken", adminUser?.password
      );

      localStorage.setItem("AstroAdminID", adminUser?._id
      );
      localStorage.setItem("email", adminUser?.email
      ); localStorage.setItem("number", adminUser?.number
      ); localStorage.setItem("user_type", adminUser?.user_type
      ); localStorage.setItem("gender", adminUser?.gender
      ); localStorage.setItem("user_info", JSON.stringify(adminUser)
      );
      window.location.href="/";
      console.log({ adminUser ,Data});
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

const adminUserSlice = createSlice({
  name: "AdminUser",
  initialState: { adminUsers: [], adminUser: {} },
  extraReducers: {
    [AddAdminUser.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.adminUsers = [...state.adminUsers, payload.adminUser];
      } else {
        alert(payload.message);
      }
    },
    [DeleteAdminUser.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.adminUsers = payload.adminUsers;
      } else {
        alert(payload.message);
      }
    },
    [UpdateAdminUser.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.adminUsers = payload.adminUsers;
      } else {
        alert(payload.message);
      }
    },

    [GetAdminUser.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.adminUsers = payload.adminUsers;
      } else {
        alert(payload.message);
      }
    },
    [LoginAdminUser.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.adminUser = payload.adminUser;
      } else {
        alert(payload.message);
      }
    },
  },
});
export default adminUserSlice.reducer;
