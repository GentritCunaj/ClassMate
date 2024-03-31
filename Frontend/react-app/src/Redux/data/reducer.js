import * as types from './types';

const initialState = {
    teachers:[],
    students:[],
    admins: [],
    publicGroups:[],
    loading:false,
    modalCreated:false
    
}

export default function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.GET_USERS_REQUEST:
        case types.GET_STUDY_GROUPS_REQUEST:
        case types.POST_STUDY_GROUP_REQUEST: 
            return {...state,loading:true}

        case types.SET_CREATED_MODAL:
          return {
            ...state,
            modalCreated: payload
            };

        case types.GET_STUDY_GROUPS_SUCCESS:
            return { ...state, publicGroups: payload.data, loading: false };

       case types.POST_STUDY_GROUP_SUCCESS:
        return {...state,loading:false,modalCreated:true}

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