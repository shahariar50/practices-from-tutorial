import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counters";

export default combineReducers({ counter: counterReducer });
