import * as types from './types';
import axios from "axios";

export const getAllUsers = (data) => async (dispatch) => {
    try {

        dispatch({ type: types.GET_USERS_REQUEST });
        const res = await axios.get(
            `https://localhost:7168/Auth/allUsers?roleName=${data}`,

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


export const getAllPublicRooms = () => async (dispatch) => {
    try {

        dispatch({ type: types.GET_STUDY_GROUPS_REQUEST });
        const res = await axios.get(
            `https://localhost:7168/Room/publicRooms`,

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
            `https://localhost:7168/Room`, data

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

export const setCreatedModal = (value) => {
    return {
        type: types.SET_CREATED_MODAL,
        payload: value
    };
};

