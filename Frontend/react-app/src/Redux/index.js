import { combineReducers } from "redux";
import dataReducer from "./data/reducer";
import 'font-awesome/css/font-awesome.min.css';



export const rootReducer = combineReducers({
  
    data: dataReducer

});
