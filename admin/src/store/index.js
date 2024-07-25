import { configureStore } from '@reduxjs/toolkit'
import Role from "../api/Role.js"
import Category from '../api/Category.js';
import AdminUser from '../api/AdminUser.js';
import User from '../api/User.js';
const store = configureStore({
    reducer: {
        roleReducer: Role,
        categoryReducer: Category,
        adminUserReducer: AdminUser,
        userReducer: User
    }
})
export default store