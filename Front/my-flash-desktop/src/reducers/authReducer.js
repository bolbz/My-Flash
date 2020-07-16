import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    images: {}
}

//  Permet de reconnaître si on est connecté ou non

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                images: action.payload
            }
        default: 
            return state;
    }
}