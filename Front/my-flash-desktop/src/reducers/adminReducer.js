import { SET_CURRENT_ADMIN } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
    Authenticated: false,
    admin: {}
}

//  Permet de reconnaître si on est connecté ou non

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_ADMIN:
            return {
                ...state,
                Authenticated: !isEmpty(action.payload),
                admin: action.payload
            }
        default: 
            return state;
    }
}