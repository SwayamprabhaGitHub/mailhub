import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import navReducer from "./navSlice";

const store = configureStore({
    reducer:{
        appSlice: appReducer,
        navSlice: navReducer,
    }
})

export default store;