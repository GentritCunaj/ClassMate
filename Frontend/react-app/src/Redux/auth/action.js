import * as types from './types';
import axios from "axios";

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