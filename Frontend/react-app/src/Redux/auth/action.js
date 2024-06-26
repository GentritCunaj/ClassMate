import * as types from './types';
import axios from "axios";


export const authLogout = () => async (dispatch) => {
      dispatch({
        type: types.AUTH_LOGOUT,
      });

  };


export const GetInfo = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_INFO_REQUEST });
        const res = await axios.get(
            `https://localhost:7168/Auth/info`, 
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        );

        
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
        return error.response.data;
    }
}

export const UpdateInfo = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_INFO_REQUEST });
        const res = await axios.put(
            `https://localhost:7168/Auth/info`, data,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        );


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

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
  
    const response = await axios.post('https://localhost:7168/Auth/refresh', 
     {accessToken:localStorage.getItem("token"),refreshToken });
   

    console.log(response);
  
    if (response.status === 200) {
      
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data.accessToken;
    }
  
    // If refresh token is invalid or expired, clear the tokens and redirect to login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return null;
  };

  export const authLogin = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.LOGIN_USER_REQUEST });
        const res = await axios.post("https://localhost:7168/Auth/loginUser", data);

        dispatch({
            type: types.LOGIN_USER_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                token: res.data.data[0],
                refreshToken: res.data.data[1]
            },
        });
        return { 
            success: res.data.success, 
            message: res.data.message 
        };
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'An error occurred during login';

        dispatch({
            type: types.LOGIN_USER_ERROR,
            payload: {
                message: message,
            },
        });
        return { 
            success: false, 
            message: message 
        };
    }
};
export const changePassword = (data) => async (dispatch) => {
    try {
       
        const res = await axios.post(
            "https://localhost:7168/Auth/changepassword",
            data,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        );
      
        return res.data;
    } catch (error) {

       
        return error.response.data
    }
};