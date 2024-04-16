import * as types from './types';
import axios from "axios";
const token = localStorage.getItem("token");


export const GetInfo = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_INFO_REQUEST });
        const res = await axios.get(
            `https://localhost:7168/Auth/info`, 
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        ;
        dispatch({
            type: types.GET_INFO_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            },
        });
        return res.data;
    } catch (error) {
        
        dispatch({
            type: types.GET_INFO_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}

export const UpdateInfo = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_INFO_REQUEST });
        const res = await axios.put(
            `https://localhost:7168/Auth/info`, data,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        ;
        dispatch({
            type: types.UPDATE_INFO_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data:res.data.data
            },
        });
        return res.data;
    } catch (error) {
        
        dispatch({
            type: types.UPDATE_INFO_ERROR,
            payload: {
                message: error.message
            }
        })
        return error.respsonse.data;
    }
}


export const Registers = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_REGISTER_REQUEST });
        const res = await axios.post(
            "https://localhost:7168/Auth/registerUser",
            data
        );
        dispatch({
            type: types.GET_REGISTER_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;

    } catch (error) {

        dispatch({
            type: types.GET_REGISTER_ERROR,
            payload: {
                message: error,
            },
        });
    }
}

export const authLogin = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.LOGIN_USER_REQUEST });
        const res = await axios.post(
            "https://localhost:7168/Auth/loginUser",
            data
        );

        dispatch({
            type: types.LOGIN_USER_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                token: res.data.data,
            },
        });
        return res.data.data;
    } catch (error) {

        dispatch({

            type: types.LOGIN_USER_ERROR,
            payload: {
                message: error.response.data.message,

            },
        });
        return error.response.data
    }
};

export const changePassword = (data) => async (dispatch) => {
    try {
       
        const res = await axios.post(
            "https://localhost:7168/Auth/changepassword",
            data,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );
      
        return res.data;
    } catch (error) {

       
        return error.response.data
    }
};