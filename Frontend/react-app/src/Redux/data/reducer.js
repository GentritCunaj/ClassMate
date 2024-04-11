import * as types from './types';

const initialState = {
    teachers:[],
    students:[],
    admins: [],
    quizs:[],
    assignments:[],
    reportStudyRoom: [],
    publicGroups:[],
    studyGroupReports:[],
    deleteStudyRoom:[],
    loading:false,
    modalCreated:false
    
}

export default function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.GET_USERS_REQUEST:
        case types.GET_STUDY_GROUPS_REQUEST:
        
        case types.POST_STUDY_GROUP_REQUEST: 
            return {...state,loading:true}

            case types.POST_QUIZ_REQUEST: 
            return {...state,loading:true}
            case types.POST_ASSIGNMENT_REQUEST: 
            return {...state,loading:true}

    case types.SET_CREATED_MODAL:
      return {
        
        ...state,
        modalCreated: payload
      };

            case types.REPORT_STUDY_ROOM_REQUEST:
              return {
                  ...state,
                  loading: true,
                  error: null
              };

              case types.DELETE_STUDY_GROUP_REQUEST:
              return {
                  ...state,
                  loading: true,
                  error: null
              };


          case types.REPORT_STUDY_ROOM_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  reportStudyRoom: payload.data,
                  error: null
              };

              case types.POST_QUIZ_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  quizs: payload.data,
                  error: null
              };
              case types.POST_ASSIGNMENT_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  assignments: payload.data,
                  error: null
              };

              case types.DELETE_STUDY_GROUP_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  deleteStudyRoom: payload.data,
                  error: null
              };
        case types.GET_STUDY_GROUPS_SUCCESS:
            return { ...state, publicGroups: payload.data, loading: false };

            case types.GET_STUDY_GROUP_REPORTS_SUCCESS:
              return { ...state, studyGroupReports: payload.data, loading: false };

       case types.POST_STUDY_GROUP_SUCCESS:
        return {...state,loading:false,modalCreated:true}
    case types.POST_STUDY_GROUP_SUCCESS:
      return { ...state, loading: false, modalCreated: true }

    case types.GET_USERS_SUCCESS:
      console.log(payload, "payload");
      if (payload.message == 'Teacher') {
        return { ...state, teachers: payload.data, loading: false }
      }
      if (payload.message == 'Admin') {
        return { ...state, admins: payload.data, loading: false }
      }
      if (payload.message == 'Student') {
        return { ...state, students: payload.data, loading: false }
      }


    default:
      return state;
  }
}