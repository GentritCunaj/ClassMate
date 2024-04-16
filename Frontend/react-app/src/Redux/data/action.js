import * as types from './types';
import axios from "axios";
const token = localStorage.getItem("token");
export const getAllUsers = (data) => async (dispatch) => {
    try {

        dispatch({ type: types.GET_USERS_REQUEST });
        const res = await axios.get(
            `https://localhost:7168/Auth/allUsers?roleName=${data}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

        );

        dispatch({
            type: types.GET_USERS_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;
    }

    catch (error) {

        dispatch({
            type: types.GET_USERS_ERROR,
            payload: {
                message: error.data.message
            }
        })
        return error.respsonse.data;
    }
}


export const reportRoom = (data) => async (dispatch) => {
    try {
        dispatch({ type: types.REPORT_STUDY_ROOM_REQUEST });
    

        const res = await axios.post(
            `https://localhost:7168/Room/report?studyGroupId=${data}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            
            
        );

        dispatch({
            type: types.REPORT_STUDY_ROOM_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });

        return res.data;
    } catch (error) {
        dispatch({
            type: types.REPORT_STUDY_ROOM_ERROR,
            payload: {
                message: error.response.data.message
            }
        });

        throw error.response.data;
    }
}

export const deleteStudyGroup = (studyGroupId) => async (dispatch) => {
    try {
        dispatch({ type: types.DELETE_STUDY_GROUP_REQUEST });
        
        const res = await axios.delete(
            `https://localhost:7168/Room/${studyGroupId}`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        dispatch({
            type: types.DELETE_STUDY_GROUP_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success
            }
        });

        return res.data;
    } catch (error) {
        dispatch({
            type: types.DELETE_STUDY_GROUP_ERROR,
            payload: {
                message: error.response.data.message
            }
        });

        throw error.response.data;
    }
};

export const getAllPublicRooms = () => async (dispatch) => {
    try {

        dispatch({ type: types.GET_STUDY_GROUPS_REQUEST });
        const res = await axios.get(
            `https://localhost:7168/Room/publicRooms`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

        );

        dispatch({
            type: types.GET_STUDY_GROUPS_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;
    }

    catch (error) {

        dispatch({
            type: types.GET_STUDY_GROUPS_ERROR,
            payload: {
                message: error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const getAllStudyGroupsReports = () => async (dispatch) => {
    try {

        dispatch({ type: types.GET_STUDY_GROUP_REPORTS_REQUEST  });
        const res = await axios.get(
            `https://localhost:7168/Room/studyGroupsWithMultipleReports`,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

        );

        dispatch({
            type: types.GET_STUDY_GROUP_REPORTS_SUCCESS ,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;
    }

    catch (error) {

        dispatch({
            type: types.GET_STUDY_GROUP_REPORTS_ERROR ,
            payload: {
                message: error.data.message
            }
        })
        return error.respsonse.data;
    }
}


export const createStudyGroup = (data) => async (dispatch) => {
    try {

        dispatch({ type: types.POST_STUDY_GROUP_REQUEST });
        const res = await axios.post(
            `https://localhost:7168/Room`, data,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

        );

        dispatch({
            type: types.POST_STUDY_GROUP_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;
    }

    catch (error) {

        dispatch({
            type: types.POST_STUDY_GROUP_ERROR,
            payload: {
                message: error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const createQuiz = (data) => async (dispatch) => {
    try {

        dispatch({ type: types.POST_QUIZ_REQUEST });
        const res = await axios.post(
            `https://localhost:7168/Quiz`, data,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

        );

        dispatch({
            type: types.POST_QUIZ_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;
    }

    catch (error) {

        dispatch({
            type: types.POST_QUIZ_ERROR,
            payload: {
                message: error.data.message
            }
        })
        return error.respsonse.data;
    }
}
export const createAssignment = (data) => async (dispatch) => {
    
    try {

        dispatch({ type: types.POST_ASSIGNMENT_REQUEST });
        const res = await axios.post(

            `https://localhost:7168/Assignment`, data,{
                headers: {
                    Authorization: "Bearer " + token
                }
            }


        );

        dispatch({
            type: types.POST_ASSIGNMENT_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;
    }

    catch (error) {

        dispatch({
            type: types.POST_ASSIGNMENT_ERROR,
            payload: {
                message: error.data.message
            }
        })
        return error.respsonse.data;
    }
}




export const createResource = (data) => async (dispatch) => {

    try {
        dispatch({ type: types.POST_RESOURCE_REQUEST });
        
        const formData = new FormData();
        formData.append('studyGroupId', data.studyGroupId);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('userId', data.userId);
        formData.append('fileInput', data.fileInput); // Append the file input as part of the FormData

        const res = await axios.post(
            `https://localhost:7168/Resources/add`, 
            formData, // Pass the FormData object here
            {
                headers: {

                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + token
                }
                

            }
        );

        dispatch({
            type: types.POST_RESOURCE_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });

        return res.data;
    } catch (error) {
        dispatch({
            type: types.POST_RESOURCE_ERROR,
            payload: {
                message: error.response.data.message // Use error.response.data.message to access the error message
            }
        });
        return error.response.data;
    }
};



export const getAllQuizzes = () => async (dispatch) => {
    try {

        dispatch({ type: types.GET_QUIZZES_REQUEST});
        const res = await axios.get(
            `https://localhost:7168/Quiz`,

            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }


        );

        dispatch({
            type: types.GET_QUIZZES_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;
    }

    catch (error) {

        dispatch({
            type: types.GET_QUIZZES_ERROR,
            payload: {
                message: error.data.message
            }
        })
        return error.respsonse.data;
    }
}

export const getAllAssignment = () => async (dispatch) => {
    try {

        dispatch({ type: types.GET_ASSIGNMENT_REQUEST});
        const res = await axios.get(
            `https://localhost:7168/Assignment`,  headers: {
                    Authorization: "Bearer " + token
                }

        );

        dispatch({
            type: types.GET_ASSIGNMENT_SUCCESS,
            payload: {
                message: res.data.message,
                success: res.data.success,
                data: res.data.data
            }
        });
        console.log(res.data);
        return res.data;
    }

    catch (error) {

        dispatch({
            type: types.GET_ASSIGNMENT_ERROR,
            payload: {
                message: error.data.message
            }
        })
        return error.respsonse.data;
    }
}


export const setCreatedModal = (value) => {
    return {
        type: types.SET_CREATED_MODAL,
        payload: value
    };
};

