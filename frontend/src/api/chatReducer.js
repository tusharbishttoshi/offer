import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchChat = createAsyncThunk("fetchChat", async ({ _id }) => {
  try {
    const response = await axios.get(`api/v1/chat?myId=${_id}`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
});
export const CreateChat = createAsyncThunk("CreateChat", async (body) => {
  try {
    const response = await axios.post(`api/v1/chat`, body);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});
export const FetchMessage = createAsyncThunk(
  "FetchMessage",
  async ({ id, astrologerId, user }) => {
    try {
      const response = await axios.post(`api/v1/message/${id}`, {
        astrologerId,
        user,
      });
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);
export const SendMessage = createAsyncThunk("sendMessage", async (body) => {
  try {
    // console.log("hii");
    const response = await axios.post(`api/v1/message`, body);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
});
export const StopChat = createAsyncThunk("StopChat", async (body) => {
  try {
    const response = await axios.post(`api/v1/session`, body);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});
export const getSession = createAsyncThunk("getSession", async ({ id }) => {
  try {
    const response = await axios.get(`api/v1/session?id=${id}`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
});

export const Cancel = createAsyncThunk("Cancel", async (body) => {
  try {
    const response = await axios.post("api/v1/cancel", body);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

const ChatSlice = createSlice({
  name: "Chat",
  initialState: { chats: [], chat: {}, allMessages: [], session: [] },
  reducers: {
    MessageHandler: (state, { payload }) => {
      const foundObject = state.allMessages.find(
        (item) => item._id === payload._id
      );
      if (!foundObject) {
        state.allMessages = [...state.allMessages, payload];
      }
    },
  },
  extraReducers: {
    [FetchChat.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.chats = payload.chats;
      }
    },
    [CreateChat.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.chat = payload.chat;
        // alert("on create a new chat redirect on chat ")
        // alert("call from only user profile")
      }
    },
    [FetchMessage.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.allMessages = payload.messages;
      }
    },

    [SendMessage.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.allMessages = [...state.allMessages, payload.message];
      }
    },
    [getSession.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.session = payload.sessions;
      }
    },
  },
});
export const { MessageHandler } = ChatSlice.actions;
export default ChatSlice.reducer;
