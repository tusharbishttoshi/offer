import { configureStore } from '@reduxjs/toolkit'
import userLogInReducer from '../api/userLogInReducer';
import chatReducer from '../api/chatReducer';
import SocketReducer from '../api/ChatRequestReducer';
import BlogReducer from '../api/BlogReducer';


const store = configureStore({
  reducer: {
    userLog: userLogInReducer,
    blog: BlogReducer,
    chat: chatReducer,
    astroRequest: SocketReducer
  }
})
export default store
