import { ADD_ITEM, TOGGLE_ITEM, DELETE_ITEM} from '../constants/TodoConstants';
import auth from '../utils/auth';

const todo = (state, action) => {
    switch (action.type){
        case ADD_ITEM:
            return action.item;
        case TOGGLE_ITEM:
            if(state.id !== action.id){
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            }
        case DELETE_ITEM:
            return state.id !== action.id;
        default:
            return state;
    }
}
export default function  todoReducer(state = [], action){
    switch (action.type){
        case ADD_ITEM:
            return [
                ...state,
                todo(undefined,action)
            ];
        case TOGGLE_ITEM:
            return state.map( item => todo(item,action));
        case DELETE_ITEM:
            return state.filter( item => todo(item,action));
        default:
            return state;
    }
}