import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ChatRequestSlice = createSlice({
    name: "socket",
    initialState: {
        AstroRequest: []
    },
    reducers: {
        ClientChat: (state, { payload }) => {
            // Check if the payload already exists in AstroRequest
            const existingPayload = state.AstroRequest.find((e) => e._id == payload._id);
            if (!existingPayload) {
                state.AstroRequest.push(payload);
            }
        },
        RemoveRequest: (state, { payload }) => {
            state.AstroRequest = state.AstroRequest.filter((e) => e._id !== payload);
        }
    }
});

// Async action for making an API call
export const cancelRequest = (body) => async (dispatch) => {
    try {
        const response = await axios.post("api/v1/cancel", body);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

export const { ClientChat, RemoveRequest  } = ChatRequestSlice.actions;
export default ChatRequestSlice.reducer;
