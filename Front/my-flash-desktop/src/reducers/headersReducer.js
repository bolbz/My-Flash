import { GET_HEADERS } from '../actions/types';

const initialState = {};

// Si des erreurs se produisent, le reducer rempli le state de ces erreurs
// et nous pouvons les afficher depuis le client
export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_HEADERS:
            return action.headers;
        default: 
            return state;
    }
}