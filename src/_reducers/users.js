import { userConstants } from '../_constants/users';

export function users(state = {}, action) {

    switch (action.type) {
        case userConstants.GET_REQUEST:
            return {
                loading: true
            };
        case userConstants.GET_SUCCESS:
            return {
                items: action.users.results,
                next: action.users.next,
                expanded: -1
            };
        case userConstants.GET_SUCCESS_LOAD_MORE:
            return {
                items: [...state.items, ...action.users.results],
                next: action.users.next,
                expanded: state.expanded
            };
        case userConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case userConstants.CHANGED_EXPANDED:
            return {

                ...state,
                expanded: action.expanded

            };
        default:
            return state
    }
}