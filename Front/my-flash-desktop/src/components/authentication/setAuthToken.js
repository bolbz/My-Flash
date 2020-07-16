import axios from 'axios';

// permet de définir le header avec le token pour de futurs requêtes
// nous ajoutons "Authorization" au token
const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;