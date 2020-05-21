import * as types from '../actions/actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, EndApiCall } from './apiStatusAction';

/* 
export function createCourse(course) {
    return {
        type: types.CREATE_COURSE,
        course //object shorthand syntax, could have been course:course, but since it matches only course will suffice and will map it 
    };
} */
export function loadCourseSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses //object shorthand syntax, could have been course:course, but since it matches only course will suffice and will map it 
    };
}
export function updateCourseSuccess(course) {
    return {
        type: types.UPDATE_AUTHORS_SUCCESS,
        course //object shorthand syntax, could have been course:course, but since it matches only course will suffice and will map it 
    };
}
export function createCourseSuccess(course) {
    return {
        type: types.CREATE_AUTHORS_SUCCESS,
        course //object shorthand syntax, could have been course:course, but since it matches only course will suffice and will map it 
    };
}
export function deleteCourseOptimistic(course) {
    return {
        type: types.DELETE_COURSE_OPTIMISTIC,
        course //object shorthand syntax, could have been course:course, but since it matches only course will suffice and will map it 
    };
}


export function loadCourses() {
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return courseApi.getCourses().then(courses => {
            dispatch(loadCourseSuccess(courses));
            console.log(getState());
        }).catch(error => {
            dispatch(EndApiCall(error));
            throw error;
        })
    }
}
export function saveCourse(course) {
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        console.log(getState);
        return courseApi.saveCourse(course).then(savedCourse => {
            savedCourse.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse))
        }).catch(error => {
            dispatch(EndApiCall(error));
            throw error;
        })
    }
}
export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id); 
    }
}