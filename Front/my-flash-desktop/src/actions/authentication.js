import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, SET_CURRENT_ADMIN, GET_HEADERS } from "./types";
import setAuthToken from "../components/authentication/setAuthToken";
import jwt_decode from "jwt-decode";


// Permet d'envoyer une requête AJAX à notre serveur node
// history permet de gérer l'historique des sessions, de naviguer 
// et de conserver le state entre les sessions
// history retourne un objet

export const registerUser = (user, history) => dispatch => {
  axios.post("/api/users/register", user).then(res =>
    // si nous obtenons une réponse nous sommes redirigés vers mailwassend
    history.push("/mailwassend"))
    // Si des erreurs sont présentes nous envoyons les actions et le reducer
    // gère cela pour nous
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const confirmUser = (user, history) => dispatch => {
  axios.post("/api/users/register/confirm/:token", user).then(res =>
    history.push("/connection"))
    .catch(err => {
      history.push("/confirmemailfail");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (user) => dispatch => {
  axios.post("/api/users/login", user).then(res => {
    const { token } = res.data;
    // permet de sauvegarder le token dans le localstorage
    localStorage.setItem("jwtToken", token);
    // on ajoute le token dans le header
    setAuthToken(token);
    // jwt_decode permet de décoder le token
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  }).catch(err => {
    if (err.response) {
      dispatch({
        type: GET_ERRORS,
        errors: err.response.data
      });
      dispatch({
        type: GET_HEADERS,
        headers: err.response.headers
      });
    }
  });
};

export const ForgotPasswordUser = (user, history) => dispatch => {
  axios.post("/api/users/forgotPassword", user).then(res => {
    history.push("/connection");
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (history) => dispatch => {
  // on supprime le token du localstorage
  localStorage.removeItem('jwtToken');
  // on supprime le token du header
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  // puis on est redirigé vers l'accueil
  if (history !== undefined) {
    history.push('/connection');
  }
}


export const resetPasswordUser = (user, history) => dispatch => {
  axios.post('/api/users/reset/:token', user).then(res => {
    history.push('/connection');
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}

export const changePassword = (user, apikey) => dispatch => {
  axios.post('/api/users/changePassword/' + apikey, user).then(res => {
    res.json();
  }).catch(err => {
    if (err.response && err.response.data) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  });
}

export const deleteAccount = (user, apikey) => dispatch => {
  axios.post('/api/users/deleteAccount/' + apikey, user).then(res => {
    res.json();
  }).catch(err => {
    if (err.response && err.response.data) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  });
}

/**************************************************** PARTIE ADMIN ****************************************************/



export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded
  };
};

export const loginAdmin = admin => dispatch => {
  axios.post("/api/admins/admin", admin).then(res => {
    const { token } = res.data;
    // permet de sauvegarder le token dans le localstorage
    localStorage.setItem("jwtAdminToken", token);
    // on ajoute le token dans le header
    setAuthToken(token);
    // jwt_decode permet de décoder le token
    const decoded = jwt_decode(token);
    dispatch(setCurrentAdmin(decoded));
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      errors: err.response.data
    });
    dispatch({
      type: GET_HEADERS,
      headers: err.response.headers
    });
  });
};

export const logoutAdmin = (history) => dispatch => {
  // on supprime le token du localstorage
  localStorage.removeItem('jwtAdminToken');
  // on supprime le token du header
  setAuthToken(false);
  dispatch(setCurrentAdmin({}));
  // puis on est redirigé vers l'accueil
  if (history !== undefined) {
    history.push('/connection-admin');
  }
}


export const registerAdmin = (admin, history) => dispatch => {
  axios.post("/api/admins/", admin).then(res =>
    // si nous obtenons une réponse nous sommes redirigés vers page admin
    history.push("/admin"))

    // Si des erreurs sont présentes nous envoyons les actions et le reducer
    // gère cela pour nous
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const resetPasswordAdmin = (admin, history) => dispatch => {
  axios.post('/api/admins/reset/', admin)
  .then(res => {
  })
  .catch(err => {
      dispatch({
          type:GET_ERRORS,
          payload: err.response.data
      });
  });
}


export const changePasswordAdmin = (admin) => dispatch => {
  axios.post('/api/admins/changePasswordAdmin/' + admin).then(res => {
    res.json();
  }).catch(err => {
    if (err.response && err.response.data) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  });
}

export const activeCards = (datas) => dispatch => {
  axios.post('/api/active/activeCards/', datas)
    .then(res => {
    })
    .catch(err => {
      if (err.response && err.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
}
