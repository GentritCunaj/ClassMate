import * as types from './types';
import axios from "axios";

export const getAllUsers = (data) => async (dispatch) => {
    try {

        dispatch({type:types.GET_USERS_REQUEST});
        const res = await axios.get(
            `https://localhost:7168/Auth/allUsers?roleName=${data}`,
          
        );
    
        dispatch({
            type: types.GET_USERS_SUCCESS,
            payload:{
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            }
    });
    console.log(res.data);
    return res.data;
    }
   
    catch(error){
        
        dispatch({
            type: types.GET_USERS_ERROR,
            payload:{
                message:error.data.message
            }
        })
        return error.respsonse.data;
    }
}