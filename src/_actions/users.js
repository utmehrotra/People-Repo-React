import { userConstants } from '../_constants/users';
import { userService } from '../_services/users';

export const userActions = {
    getUsers
};

function getUsers({ page = 1 }) {
    console.log(page);
    return dispatch => {
        dispatch(request());

        userService.getUsers({ page })
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(users) { return { type: userConstants.GET_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_FAILURE, error } }
}