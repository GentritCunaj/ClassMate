import * as types from './types';
const token = localStorage.getItem("token");
const initialState = {
  userLogin: {
    loading: false, error: false, message: ""
  },
  userLogout: { message: "" },

  data: {
    token: token,
    loading: false,
  },
  message: ""
}
export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        
        case types.GET_REGISTER_REQUEST:
      return { ...state, loading:true, error: null };
    case types.GET_REGISTER_SUCCESS:
      return { ...state, loading:false, message: payload.message };
    case types.GET_REGISTER_ERROR:
      return { ...state, loading:false, error: payload.message };

      case types.LOGIN_USER_REQUEST :

      return {
          ...state, userLogin:{loading:true,error:false},
      };
    case types.LOGIN_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userLogin: { loading: false, error: false, message: payload.message },
        data: {
          token: payload.token,

        },
      };
    case types.LOGIN_USER_ERROR:

      return {
        ...state, userLogin: { loading: false, error: true, message: payload.message }
      }

      default:
        return state;
    }
  }