import { CHANGE_FORM, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/UserConstants';
import auth from '../utils/auth';

const assign = Object.assign || require('object.assign');

const initialState = {
    formState: {
        username: '',
        password: ''
    },
    currentlySending: false,
    loggedIn: auth.loggedIn(),
    errorMessage: ''
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FORM:
            return assign({}, state, {
                formState: action.newState
            });
            break;
        case SET_AUTH:
            return assign({}, state, {
                loggedIn: action.newState
            });
            break;
        case SENDING_REQUEST:
            return assign({}, state, {
                currentlySending: action.sending
            });
            break;
        case SET_ERROR_MESSAGE:
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}