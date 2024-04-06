import { combineReducers } from "redux";
import dataReducer from "./data/reducer";
import 'font-awesome/css/font-awesome.min.css';
import authReducer from "./auth/reducer";



export const rootReducer = combineReducers({
  
    data:dataReducer,
    auth:authReducer

});
