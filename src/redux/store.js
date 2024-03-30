import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./states/user";

export default configureStore({
    reducer:{
        userInfo: userSliceReducer,
    }
})