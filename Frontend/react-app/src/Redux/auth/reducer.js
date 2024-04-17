import * as types from './types';
const token = localStorage.getItem("token");
const initialState = {
  userLogin: {
    loading: false, error: false, message: ""
  },
  userLogout: { message: "" },
  user:null,
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

    case types.AUTH_LOGOUT:
          localStorage.removeItem("token");
          return {...state,
          userLogin: { loading: false, error: false, message: "" },
          userLogout: { message: "Logout Successfully" },
          user:null,
          data : {
            token:null,
          },
         
          
      }      

    case types.GET_INFO_SUCCESS:
      return {
        ...state,user:payload.data
    }
         
    case types.UPDATE_INFO_SUCCESS:
      return {
          ...state,user:payload.data
      }
                 
   
    case types.LOGIN_USER_ERROR:

      return {
        ...state, userLogin: { loading: false, error: true, message: payload.message }
      }

      default:
        return state;
    }
  }