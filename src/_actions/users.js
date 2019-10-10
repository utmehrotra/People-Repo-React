import { userConstants } from '../_constants/users';
import { userService } from '../_services/users';

export const userActions = {
    getUsers,
    getUsersFromNextPage,
    expandThis
};

function getUsers(query) {
    console.log(query);
    return dispatch => {
        dispatch(request());

        userService.getUsers(query)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(users) { return { type: userConstants.GET_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_FAILURE, error } }
}

function getUsersFromNextPage(pageURL) {
    return dispatch => {
        dispatch(request());

        userService.getUsersFromURL(pageURL)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_REQUEST_LOAD_MORE } }
    function success(users) { return { type: userConstants.GET_SUCCESS_LOAD_MORE, users } }
    function failure(error) { return { type: userConstants.GET_FAILURE_LOAD_MORE, error } }
}

function expandThis(index) {
    return dispatch => {
        dispatch(newIndex(index))
    };
    function newIndex(expanded) { return { type: userConstants.CHANGED_EXPANDED, expanded } }
}