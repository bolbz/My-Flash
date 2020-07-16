import React from "react";
import homepage_image from "../../images/homepage_image.png";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import classnames from 'classnames';

class Connection extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: "",
      headers: {}
    }
    // crée une nouvelle fonction avec le mot "this" assigné à la valeur passé en paramètre
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // permet d'ajuster la valeur du state à chaque changement
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Fonction permettant l'envoi des données de connexion
  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(user);
  }

  // Si nous sommes déjà authentifié au chargement du composant nous sommes redirigé vers la page profile
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/editer-profile-general');
    }
     if (this.props.admin.Authenticated) {
      this.props.history.push('/');
    }
  }
  
  

  // Si l'authentification est correct quand on reçoit les props
  //  alors nous sommes redirigé vers la page profile
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/editer-profile-general')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        headers: nextProps.headers
      });
    }
  }

  render() {
    const { errors, headers } = this.state;
    return (
      <div>
        <div className="container-fluid test" style={styles.container}>
          <div className="row col-12 mt-2 justify-content-center" style={{ marginBottom: '10vh' }}>
            <div className="col-12 p-0">
              <img
                className=" img-fluid"
                style={styles.responsive}
                src={homepage_image}
                alt="My Flash logo"
              />
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  /* classnames permet d'afficher les erreurs côté client*/
                  className={classnames('form-control form-control-lg mt-4', {
                    'is-invalid': errors
                  })}
                  name="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                  placeholder="Adresse email"
                  style={styles.input}
                />
                {/* si des erreurs émergent, elles sont affichées en-dessous de l'input */}
                {/* {errors.error && (<div className="invalid-feedback">{errors.error}</div>)} */}
                {errors && (<div className="invalid-feedback">Essais restants : {headers["x-ratelimit-remaining"]}</div>)}
              </div>
              <div className="form-group" style={{ marginTop: '4vh' }}>
                <input
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="Mot de passe"
                  autoComplete="on"
                  style={styles.input}
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors
                  })}
                  name="password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
                {errors && (<div className="invalid-feedback">{errors.password ? errors.password : (errors.error ? errors.error : null)}</div>)}
              </div>
              <button type="submit" style={styles.connectionButton} className="btn mt-3">
                Se connecter
            </button>
            </form>
            <div className="col-12 justify-content-center">
              <a href="/forgotPassword" style={styles.lien} className="col-12">Mot de passe oublié ?</a>
            </div>
            <Link to="/">
              <button type="submit" style={styles.returnButton} className="btn">
                Retour
            </button>
            </Link>
          </div>
        </div>
      </div >
    );
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center',
    marginTop: '3vh'
  },
  input: {
    border: '1px solid #0085c5',
    width: '45vh'
  },
  connectionButton: {
    color: "white",
    backgroundColor: "#0085c5",
    marginTop: "5vh",
    border: "2px solid #0085c5",
    borderRadius: "7px",
    fontSize: "1rem",
    padding: "1vh",
    cursor: "pointer",
    width: '25vh'
  },
  returnButton: {
    color: "white",
    backgroundColor: "#7AB51D",
    marginTop: "2vh",
    borderRadius: "3px",
    fontSize: "0.7rem",
    padding: "1vh",
    cursor: "pointer",
    width: '15vh'
  },
  lien: {
    textDecoration: "none",
    color: "grey"
  },
  responsive: {
    height: '38vh',
  }
};

// PropTypes vérifie que les données reçues via les props sont valides
Connection.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired || PropTypes.string.isRequired,
  headers: PropTypes.object.isRequired
}

// premier paramètre de "connect", mapStateToProps est utilisé pour
// sélectionner la partie des données du store que le composant connecté
// (ici Connection.js) a besoin.
const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  errors: state.errors,
  headers: state.headers
})

// connect permet de connecter notre fichier Connection.js à notre store redux
// withRouter permet d'accèder aux propriétés de l'objet history et d'être redirigé même
// si on est en-dehors d'un router
export default connect(mapStateToProps, { loginUser })(Connection)
