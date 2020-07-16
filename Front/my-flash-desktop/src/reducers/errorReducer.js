import { GET_ERRORS } from '../actions/types';

const initialState = {};

// Si des erreurs se produisent, le reducer rempli le state de ces erreurs
// et nous pouvons les afficher depuis le client
export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS:
            return action.errors;
        default: 
            return state;
    }
}