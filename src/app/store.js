<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import persistReducer from "redux-persist/es/persistReducer";
const persistConfig={
    key:"root",
    version:1,
    storage
};

const reducer=combineReducers({
    user: userReducer,
})

const persistedReducer=persistReducer(persistConfig,reducer);

export default configureStore({
    reducer:persistedReducer
});
=======
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import persistReducer from "redux-persist/es/persistReducer";
const persistConfig={
    key:"root",
    version:1,
    storage
};

const reducer=combineReducers({
    user: userReducer,
})

const persistedReducer=persistReducer(persistConfig,reducer);

export default configureStore({
    reducer:persistedReducer
});
>>>>>>> origin/main
