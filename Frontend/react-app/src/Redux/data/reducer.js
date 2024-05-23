import * as types from './types';

const initialState = {

  teachers: [],
  students: [],
  admins: [],
  quizs: [],
  submissions:[],
  assignments: [],
  reportStudyRoom: [],
  publicGroups: [],
  studyGroupReports: [],
  resources: [],
  reports:[],
  deleteStudyRoom: [],
  submitLoading: false,
  loading: false,
  modalCreated: false,
  subjects:[],
  privateGroups:[]


}

export default function dataReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_USERS_REQUEST:
    case types.GET_STUDY_GROUPS_REQUEST:


    case types.POST_STUDY_GROUP_REQUEST:
      return { ...state, loading: true }
    case types.GET_ASSIGNMENT_REQUEST:
      return { ...state, loading: true };
    case types.GET_RESOURCES_REQUEST:
      return { ...state, loading: true };
      case types.GET_REPORT_REQUEST:
      return { ...state, loading: true };
    case types.POST_QUIZ_REQUEST:
      return { ...state, loading: true }
      case types.POST_REPORT_REQUEST:
      return { ...state, loading: true }
    case types.POST_ASSIGNMENT_REQUEST:
      return { ...state, loading: true }
    case types.POST_ASSIGNMENT_REQUEST:
      return { ...state, loading: true }


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
      case types.DELETE_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.DELETE_RESOURCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.DELETE_ASSIGNMENT_REQUEST:
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

      case types.GET_ASSIGNMET_BY_SUBJECT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        assignments: payload.data,
        error: null
      };

      case types.GET_QUIZZES_BY_SUBJECT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        quizs: payload.data,
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
      case types.POST_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: payload.data,
        error: null
      };
    case types.POST_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        resources: payload.data,
        error: null
      };

      case types.SUBMIT_ASSIGNMENT_REQUEST:
            return {
                ...state,
                submitLoading: true,
            };
        case types.SUBMIT_ASSIGNMENT_SUCCESS:
          console.log("Payload Data:", payload.data);
            return {
                ...state,
                submitLoading: false,
                submissions: Array.isArray(state.submissions) ? [...state.submissions, payload.data] : [payload.data], // Ensure submissions is always an array
                error: null,
            };
        case types.SUBMIT_ASSIGNMENT_FAILURE:
            return {
                ...state,
                submitLoading: false,
                error: payload.data,
            };

    case types.DELETE_STUDY_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        studyGroupReports: payload.data,
        error: null
      };

    case types.DELETE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        assignments: payload.data,
        error: null
      };

      case types.DELETE_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: payload.data,
        error: null
      };

    case types.DELETE_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quizs: payload.data,
        error: null
      };

    case types.DELETE_RESOURCE_SUCCESS:

      return {
        ...state,
        loading: false,
        resources: payload.data,

      };
      case types.GET_SUBJECTS_SUCCESS:
        return { ...state, subjects: payload.data, loading: false };

    case types.GET_STUDY_GROUPS_SUCCESS:
      return { ...state, publicGroups: payload.data, loading: false };

    case types.GET_PRIVATE_STUDY_GROUPS_SUCCESS:
    return { ...state, privateGroups: payload.data, loading: false };

      case types.GET_REPORT_SUCCESS:
      return { ...state, reports: payload.data, loading: false };

    case types.GET_STUDY_GROUP_REPORTS_SUCCESS:
      return { ...state, studyGroupReports: payload.data, loading: false };

    case types.GET_QUIZZES_SUCCESS:
      return { ...state, quizs: payload.data, loading: false };

    case types.GET_QUIZ_BY_ID_SUCCESS:
      return { ...state, quizs: payload.data, loading: false };

    case types.UPDATE_QUIZ_SUCCESS:
      return {
        ...state, quizs: payload.data
      }

      case types.EDIT_ASSIGNMENT_SUCCESS:
      return {
        ...state, assignments: payload.data
      }
      case types.EDIT_RESOURCE_SUCCESS:
      return {
        ...state, resources: payload.data
      }
    case types.GET_QUIZ_BY_ID_SUCCESS:
      return {
        ...state,
        quizs: state.quizs.map(quiz => {
          if (quiz.id === payload.data.id) {
            return payload.data; // Update the specific quiz
          }
          return quiz;
        }),
        loading: false
      };


      case types.GET_RESOURCE_BY_ID_SUCCESS:
      return {
        ...state,
        resources: state.resources.map(resource => {
          if (resource.id === payload.data.id) {
            return payload.data;
          }
          return resource;
        }),
        loading: false
      };

      case types.GET_ASSIGNMET_BY_ID_SUCCESS:
      return {
        ...state,
        assignments: state.assignments.map(assigment => {
          if (assigment.id === payload.data.id) {
            return payload.data; // Update the specific ASSIGNMENT
          }
          return assigment;
        }),
        loading: false
      };
    
    case types.UPDATE_QUIZ_SUCCESS:
      return {
        ...state,
        quizs: state.quizs.map(quiz => {
          if (quiz.id === payload.data.id) {
            return payload.data; // Update the specific quiz
          }
          return quiz;
        }),
        loading: false
      };

      case types.EDIT_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        assignments: state.assignments.map(assignment => {
          if (assignment.id === payload.data.id) {
            return payload.data; // Update the specific assignmet
          }
          return assignment;
        }),
        loading: false
      };
    case types.GET_ASSIGNMENT_SUCCESS:
      return { ...state, assignments: payload.data, loading: false };

    case types.GET_RESOURCES_SUCCESS:
      return { ...state, resources: payload.data, loading: false };


    case types.POST_STUDY_GROUP_SUCCESS:
      return { ...state, loading: false, modalCreated: true }
    

    case type.GET_RESOURCES_ERROR:
      return { ...state, error: payload.data, loading: false };

    case type.GET_ASSIGNMENT_ERROR:
      return { ...state, error: payload.data, loading: false };

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