import * as types from './types';

const initialState = {
    teachers:[],
    students:[],
    admins:[],
    loading:false
    
}

export default function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.GET_USERS_REQUEST:
            return {...state,loading:true}

       
       case types.GET_USERS_SUCCESS:
        console.log(payload,"payload");
          if (payload.message == 'Teacher'){
            return {...state,teachers:payload.data,loading:false}
          }
          if (payload.message == 'Admin'){
            return {...state,admins:payload.data,loading:false}
          }
          if (payload.message == 'Student'){
            return {...state,students:payload.data,loading:false}
          }
          

        default:
            return state;
    }
}