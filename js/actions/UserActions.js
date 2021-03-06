//import bcrypt from 'bcryptjs'  加密
import { SET_AUTH, CHANGE_FORM, SENDING_REQUEST,SET_ERROR_MESSAGE } from '../constants/UserConstants';
import * as errorMessages from '../constants/MessageConstants';
import auth from '../utils/auth';
import { browserHistory } from 'react-router';

export function login(username, password){
    return (dispatch) => {
        dispatch(sendingRequest(true));
        if(anyElementEmpty({username, password})) {
            dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
            dispatch(sendingRequest(false));
            return;
        }

        auth.login(username, password, (check,error) => {
            dispatch(sendingRequest(false));
            dispatch(setAuthState(check));
            if(check === true){
                dispatch(changeForm({
                    username:"",
                    password:""
                }));
                forwardTo('/dashboard');
            } else {

                switch (error.type) {
                    case 'user-doesnt-exist':
                        dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
                        return;
                    case 'password-wrong':
                        dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
                        return;
                    default:
                        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
                        return;
                }
            }
        });
    }
}

export function logout() {
    return (dispatch) => {
        dispatch(sendingRequest(true));
        auth.logout((check, err) => {
           if(check === true){
               dispatch(sendingRequest(false));
               dispatch(setAuthState(false));

               browserHistory.replace('/',null);
           } else {
               dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
           }
        });
    }
}

export function register(username,password) {
    return (dispatch) => {
        dispatch(sendingRequest(true));
        if(anyElementEmpty(username,password)) {
            dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
            dispatch(sendinRequest(false));
            return;
        } else {
            auth.register(username, password, (check, err) => {
                dispatch(sendingRequest(false));
                dispatch(setAuthState(check));
                if(check){
                    forwardTo('/dashboard');
                    dispatch(changeForm({
                        username: "",
                        password: ""
                    }));
                } else {
                    switch (err.type) {
                        case 'username-exists' :
                            dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
                            return;
                        default:
                            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
                            return;
                    }
                }
            });
        }
    }
}

export function setAuthState(newState) {
    return {type: SET_AUTH, newState};
}

export  function changeForm(newState) {
    return {type: CHANGE_FORM, newState};
}

export function sendingRequest(sending) {
    return { type: SENDING_REQUEST, sending};
}

export function setErrorMessage(message) {
    return (dispatch) => {
        dispatch({type: SET_ERROR_MESSAGE, message});

        //error 动画省略
        // 3s后移出错误
        setTimeout(() =>{
            dispatch({type: SET_ERROR_MESSAGE, message:""});
        },3000);
    }
}

function forwardTo(location) {
    browserHistory.push(location);
}

function anyElementEmpty(elements) {
    for(let element in elements){
        if(!elements[element]){
            return true;
        }
    }
    return false;
}
