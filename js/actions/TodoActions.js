//import bcrypt from 'bcryptjs'  加密
import { ADD_ITEM, TOGGLE_ITEM, DELETE_ITEM} from '../constants/TodoConstants';
import * as errorMessages from '../constants/MessageConstants';
import auth from '../utils/auth';
import { browserHistory } from 'react-router';

export function addItem(text){
    return {
        type: ADD_ITEM,
        item:{
            id:Date.now(),
            text,
            completed:false
        }
    }
}

export function deleteItem(id){
    console.log("delete2");
    return {
        type:DELETE_ITEM,
        id
    }
}

export function toggleItem(id) {
    return {
        type:TOGGLE_ITEM,
        id
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