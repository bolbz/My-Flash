import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import headersReducer from'./headersReducer';

// permet de faire le lien entre le store et les reducers
export default combineReducers({
   errors: errorReducer,
    auth: authReducer,
    admin: adminReducer,
    headers: headersReducer
});