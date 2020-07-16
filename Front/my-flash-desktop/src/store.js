import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const inititalState = {};
// Permet de faire des requêtes AJAX ou réseau via redux (thunk)
// composeWithDevTools permet de se connecter notre store à chrome 
const store = createStore(
        rootReducer, 
        inititalState, 
        composeWithDevTools(applyMiddleware(thunk)));
        // window.REDUX_DEVTOOLS_EXTENSION&& window.REDUX_DEVTOOLS_EXTENSION()));

export default store;