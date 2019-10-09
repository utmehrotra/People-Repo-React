import { userConstants } from '../_constants/users';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_REQUEST:
            return {
                loading: true
            };
        case userConstants.GET_SUCCESS:
            return {
                items: action.users.results
            };
        case userConstants.GET_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}